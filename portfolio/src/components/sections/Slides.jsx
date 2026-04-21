import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { getPdfDocument } from "../../utils/pdfCache";
import Container from "../ui/Container";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function SlideZoomWrap({ id, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -28]);

  return (
    <motion.div ref={ref} id={id} style={{ scale, y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}

export default function Slides({ data, targetPage, chromeless = false }) {
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(null);
  const pageRefs = useRef([]);
  const pageWrapRefs = useRef([]);
  const pdfRef = useRef(null);
  const renderQueue = useRef([]);
  const rendering = useRef(new Set());
  const inFlight = useRef(0);
  const [rendered, setRendered] = useState([]);
  const renderedRef = useRef([]);

  const pdfSrc = data?.pdfSrc;
  const label = useMemo(() => data?.title || "Slides", [data?.title]);

  useEffect(() => {
    renderedRef.current = rendered;
  }, [rendered]);

  const enqueueRender = (pageNumber, { priority = false } = {}) => {
    if (!pageNumber) return;
    if (renderedRef.current[pageNumber - 1]) return;
    if (rendering.current.has(pageNumber)) return;
    if (renderQueue.current.includes(pageNumber)) return;

    if (priority) renderQueue.current.unshift(pageNumber);
    else renderQueue.current.push(pageNumber);

    const drain = () => {
      if (!pdfRef.current) return;
      const maxConcurrency = 2;

      while (inFlight.current < maxConcurrency && renderQueue.current.length > 0) {
        const nextPage = renderQueue.current.shift();
        if (!nextPage) continue;
        if (renderedRef.current[nextPage - 1]) continue;
        if (rendering.current.has(nextPage)) continue;

        inFlight.current += 1;
        rendering.current.add(nextPage);

        (async () => {
          try {
            const pdf = pdfRef.current;
            const page = await pdf.getPage(nextPage);

            const canvas = pageRefs.current[nextPage];
            if (!canvas) return;
            const ctx = canvas.getContext("2d", { alpha: false });
            if (!ctx) return;

            const wrap = pageWrapRefs.current[nextPage];
            const wrapWidth = wrap?.clientWidth || canvas.parentElement?.clientWidth || 1200;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const at1 = page.getViewport({ scale: 1 });
            const scale = (wrapWidth / at1.width) * dpr;
            const viewport = page.getViewport({ scale });

            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);

            await page.render({ canvasContext: ctx, viewport }).promise;

            setRendered((prev) => {
              const next = prev.length ? [...prev] : Array(pageCount).fill(false);
              next[nextPage - 1] = true;
              return next;
            });
          } catch (e) {
            console.warn(`[Slides Render Error] page ${nextPage} -> ${String(e?.message || e)}`);
          } finally {
            rendering.current.delete(nextPage);
            inFlight.current -= 1;
            setTimeout(drain, 0);
          }
        })();
      }
    };

    setTimeout(drain, 0);
  };

  useEffect(() => {
    if (!pdfSrc) {
      setError(`[Slides Missing] ${label} -> (missing pdfSrc)`);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const pdf = await getPdfDocument(pdfSrc);
        if (cancelled) return;

        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        setRendered(Array(pdf.numPages).fill(false));
        console.groupCollapsed(`[Slides Loaded] ${label}`);
        console.log(`- src: ${pdfSrc}`);
        console.log(`- pages: ${pdf.numPages}`);
        console.groupEnd();
      } catch (e) {
        if (cancelled) return;
        setError(`[Slides Error] ${label} -> ${String(e?.message || e)}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      pdfRef.current = null;
      renderQueue.current = [];
      rendering.current = new Set();
      inFlight.current = 0;
    };
  }, [pdfSrc, label]);

  useEffect(() => {
    if (loading) return undefined;
    if (pageCount <= 0) return undefined;

    // Prime likely pages so it feels instant.
    enqueueRender(targetPage || 1, { priority: true });
    enqueueRender(1, { priority: true });
    enqueueRender(2);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const pageNumber = Number(entry.target.getAttribute("data-page"));
          if (!pageNumber) return;
          enqueueRender(pageNumber);
        });
      },
      { root: null, rootMargin: "900px 0px 900px 0px", threshold: 0.01 },
    );

    for (let i = 1; i <= pageCount; i += 1) {
      const el = pageWrapRefs.current[i];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pageCount, targetPage]);

  useEffect(() => {
    if (!targetPage) return;
    if (loading) return;
    if (pageCount <= 0) return;
    if (pageCount > 0 && targetPage > pageCount) {
      console.warn(`[Slides Nav] Requested page ${targetPage} but PDF has ${pageCount} pages.`);
    }

    const go = () => {
      const el = document.getElementById(`slide-page-${targetPage}`);
      if (!el) return false;
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -24, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return true;
    };

    // Sometimes pages mount slightly after `loading` flips; retry once.
    if (!go()) {
      const t = setTimeout(go, 80);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [targetPage, loading, pageCount]);

  return (
    <section
      id={data.sectionId}
      className="relative min-h-screen border-b border-black/10 bg-[#070707] px-6 py-16 text-[#f4f1ea] sm:px-10 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(193,18,31,0.22), transparent 46%), radial-gradient(circle at 78% 38%, rgba(193,18,31,0.12), transparent 44%)",
        }}
      />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={staggerContainer}>
        <Container className="relative">
          {!chromeless ? (
            <motion.div variants={fadeUp} className="mb-10 border-b border-[#c1121f]/25 pb-6">
              <h1 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-[#f4f1ea] sm:text-5xl">
                {data.title}
              </h1>
            </motion.div>
          ) : null}

          {error ? (
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#c1121f]/35 bg-black/50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#f4f1ea]/80">
              <span className="h-2 w-2 rounded-full bg-[#c1121f]/80" />
              Slides failed to load
            </div>
          ) : null}

          <div className="space-y-10">
            {loading
              ? Array.from({ length: 2 }, (_, i) => (
                  <div
                    key={`placeholder-${i}`}
                    className="overflow-hidden rounded-[14px] border border-[#c1121f]/20 bg-black/30 soft-card-shadow"
                  >
                    <div className="aspect-[16/10] w-full animate-pulse bg-gradient-to-br from-[#c1121f]/10 via-black/10 to-black/20" />
                  </div>
                ))
              : null}

            {Array.from({ length: pageCount }, (_, i) => {
              const pageNumber = i + 1;
              const isRendered = Boolean(rendered[pageNumber - 1]);
              return (
                <SlideZoomWrap key={pageNumber} id={`slide-page-${pageNumber}`}>
                  <div
                    ref={(el) => {
                      if (el) pageWrapRefs.current[pageNumber] = el;
                    }}
                    data-page={pageNumber}
                    className="overflow-hidden rounded-[14px] border border-[#c1121f]/25 bg-black/30 soft-card-shadow"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <div
                        aria-hidden
                        className={`absolute inset-0 bg-gradient-to-br from-[#c1121f]/10 via-black/10 to-black/20 transition-opacity duration-700 ${
                          isRendered ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      <canvas
                        ref={(el) => {
                          if (el) pageRefs.current[pageNumber] = el;
                        }}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                          isRendered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </div>
                </SlideZoomWrap>
              );
            })}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
