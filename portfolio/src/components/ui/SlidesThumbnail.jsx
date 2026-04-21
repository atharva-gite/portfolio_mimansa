import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { getPdfDocument } from "../../utils/pdfCache";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function SlidesThumbnail({ pdfSrc, label = "Slides thumbnail", className = "" }) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(!pdfSrc);

  useEffect(() => {
    if (!pdfSrc) {
      console.warn(`[SlidesThumbnail Missing] ${label} -> (missing pdfSrc)`);
      setFailed(true);
      return undefined;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setFailed(false);
        const pdf = await getPdfDocument(pdfSrc);
        if (cancelled) return;
        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const viewport = page.getViewport({ scale: 0.65 });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page.render({ canvasContext: ctx, viewport }).promise;
      } catch (e) {
        if (cancelled) return;
        console.warn(`[SlidesThumbnail Error] ${label} -> ${String(e?.message || e)}`);
        setFailed(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [pdfSrc, label]);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-red-500/40 bg-black/70 px-4 py-6 text-center text-[11px] uppercase tracking-[0.25em] text-red-200/80 ${className}`}
      >
        <span className="text-[10px] font-semibold text-red-200/80">{label}</span>
        <span className="text-[10px] tracking-normal text-red-200/60">{pdfSrc || "(missing pdfSrc)"}</span>
        <span className="text-[10px] tracking-normal text-red-200/60">Replace / Fix PDF</span>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={className} />;
}
