import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import PortfolioImage from "./PortfolioImage";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const BOOK = {
  x0: 6,
  x1: 94,
  y0: 12,
  y1: 95,
  gutter: 2.0,
};

const FLIP_MOTION = {
  duration: 2.25,
  ease: [0.24, 0.72, 0.2, 1],
};

const sharedDecodeTasks = new Map();
const sharedDecoded = new Set();
const sharedTextureTasks = new Map();
const sharedTextureUrls = new Map();

function clipRect(x0, y0, x1, y1) {
  return `polygon(${x0}% ${y0}%, ${x1}% ${y0}%, ${x1}% ${y1}%, ${x0}% ${y1}%)`;
}

function clipLeftPage() {
  const mid = (BOOK.x0 + BOOK.x1) / 2;
  return clipRect(BOOK.x0, BOOK.y0, mid - BOOK.gutter / 2, BOOK.y1);
}

function clipRightPage() {
  const mid = (BOOK.x0 + BOOK.x1) / 2;
  return clipRect(mid + BOOK.gutter / 2, BOOK.y0, BOOK.x1, BOOK.y1);
}

function clipLeftPageWithBleed(bleed = 0.6) {
  const mid = (BOOK.x0 + BOOK.x1) / 2;
  return clipRect(BOOK.x0, BOOK.y0, mid - BOOK.gutter / 2 + bleed, BOOK.y1);
}

function clipRightPageWithBleed(bleed = 0.6) {
  const mid = (BOOK.x0 + BOOK.x1) / 2;
  return clipRect(mid + BOOK.gutter / 2 - bleed, BOOK.y0, BOOK.x1, BOOK.y1);
}

async function ensureImageDecoded(src) {
  if (!src) return;
  if (sharedDecoded.has(src)) return;
  if (!sharedDecodeTasks.has(src)) {
    const img = new Image();
    img.src = src;
    const decodeTask = Promise.race([
      img.decode?.().catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, 350)),
    ]).then(() => {
      sharedDecoded.add(src);
      sharedDecodeTasks.delete(src);
    });
    sharedDecodeTasks.set(src, decodeTask);
  }
  await sharedDecodeTasks.get(src);
}

function sideCropRect(width, height, side, bleed = 0.8) {
  const mid = (BOOK.x0 + BOOK.x1) / 2;
  const left = (BOOK.x0 / 100) * width;
  const right = (BOOK.x1 / 100) * width;
  const top = (BOOK.y0 / 100) * height;
  const bottom = (BOOK.y1 / 100) * height;
  const centerLeft = ((mid - BOOK.gutter / 2 + bleed) / 100) * width;
  const centerRight = ((mid + BOOK.gutter / 2 - bleed) / 100) * width;

  if (side === "left") {
    return {
      x: left,
      y: top,
      w: Math.max(1, centerLeft - left),
      h: Math.max(1, bottom - top),
      dx: left,
      dy: top,
    };
  }
  return {
    x: centerRight,
    y: top,
    w: Math.max(1, right - centerRight),
    h: Math.max(1, bottom - top),
    dx: centerRight,
    dy: top,
  };
}

async function ensureSideTexture(src, side) {
  if (!src) return null;
  const key = `${src}::${side}`;
  if (sharedTextureUrls.has(key)) return sharedTextureUrls.get(key);
  if (!sharedTextureTasks.has(key)) {
    const task = (async () => {
      await ensureImageDecoded(src);
      const img = new Image();
      img.src = src;
      await (img.decode?.().catch(() => {}) ?? Promise.resolve());
      const width = img.naturalWidth || 1;
      const height = img.naturalHeight || 1;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const r = sideCropRect(width, height, side);
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, r.x, r.y, r.w, r.h, r.dx, r.dy, r.w, r.h);
      }
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const url = blob ? URL.createObjectURL(blob) : src;
      sharedTextureUrls.set(key, url);
      sharedTextureTasks.delete(key);
      return url;
    })();
    sharedTextureTasks.set(key, task);
  }
  return sharedTextureTasks.get(key);
}

export default function ZineFlip({ pages = [], initialIndex = 0 }) {
  const safePages = useMemo(() => pages.filter(Boolean), [pages]);
  const [index, setIndex] = useState(clamp(initialIndex, 0, Math.max(0, safePages.length - 1)));
  const [flip, setFlip] = useState(null);
  const [preparing, setPreparing] = useState(false);
  const tokenRef = useRef(0);
  const [cacheReady, setCacheReady] = useState(false);

  const rotate = useMotionValue(0);
  const absRotate = useTransform(rotate, (value) => Math.abs(value));
  const edgeShadowOpacity = useTransform(absRotate, [0, 90, 180], [0.06, 0.24, 0.12]);
  const highlightOpacity = useTransform(absRotate, [0, 84, 124, 180], [0, 0.06, 0.1, 0]);
  const revealOpacity = useTransform(absRotate, [0, 30, 78, 180], [0, 0, 1, 1]);
  const gutterOcclusionOpacity = useTransform(absRotate, [0, 58, 92, 126, 180], [0, 0.08, 0.22, 0.08, 0]);

  const hasPrev = index > 0;
  const hasNext = index < safePages.length - 1;
  const canPrev = hasPrev && !flip && !preparing && cacheReady;
  const canNext = hasNext && !flip && !preparing && cacheReady;

  const current = safePages[index];
  const next = safePages[index + 1] || null;
  const prev = safePages[index - 1] || null;

  const ensureDecoded = async (src) => ensureImageDecoded(src);

  useEffect(() => {
    [current, next, prev].filter(Boolean).forEach((src) => {
      ensureDecoded(src);
    });
  }, [current, next, prev]);

  useEffect(() => {
    let cancelled = false;
    setCacheReady(false);
    Promise.all(
      safePages.flatMap((src) => [ensureDecoded(src), ensureSideTexture(src, "left"), ensureSideTexture(src, "right")]),
    ).then(() => {
      if (!cancelled) setCacheReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [safePages]);

  const startFlip = async (direction) => {
    if (flip || preparing) return;
    const isNext = direction === "next";
    const targetIndex = isNext ? index + 1 : index - 1;
    const from = safePages[index];
    const to = safePages[targetIndex];
    if (!to) return;

    setPreparing(true);
    await ensureDecoded(to);
    await ensureDecoded(from);
    const frontSide = direction === "next" ? "right" : "left";
    const backSide = direction === "next" ? "left" : "right";
    const revealSide = frontSide;
    const [frontTexture, backTexture, revealTexture] = await Promise.all([
      ensureSideTexture(from, frontSide),
      ensureSideTexture(to, backSide),
      ensureSideTexture(to, revealSide),
    ]);
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    setFlip({
      token,
      direction,
      from,
      to,
      toIndex: targetIndex,
      frontTexture: frontTexture || from,
      backTexture: backTexture || to,
      revealTexture: revealTexture || to,
    });
    setPreparing(false);
  };

  const flipNext = () => {
    if (!canNext) return;
    startFlip("next");
  };

  const flipPrev = () => {
    if (!canPrev) return;
    startFlip("prev");
  };

  if (safePages.length === 0) {
    return (
      <div className="border border-dashed border-[#c1121f]/40 bg-black/40 p-6 text-sm text-[#f4f1ea]/80">
        No zine pages provided.
      </div>
    );
  }

  const originX = `${(BOOK.x0 + BOOK.x1) / 2}%`;
  const direction = flip?.direction || "next";
  const turningFrontClip = direction === "next" ? clipRightPageWithBleed() : clipLeftPageWithBleed();
  const turnToAngle = direction === "next" ? -180 : 180;

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="flex items-center justify-between pb-6 text-[11px] uppercase tracking-[0.35em] text-[#f4f1ea]/70">
        <button
          type="button"
          onClick={flipPrev}
          disabled={!canPrev}
          className="rounded-full border border-[#c1121f]/30 bg-black/50 px-4 py-2 text-[#f4f1ea]/80 transition disabled:opacity-30 hover:bg-black/60"
        >
          Prev
        </button>
        <div className="flex items-center gap-3">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(safePages.length).padStart(2, "0")}
          </span>
          <span className="h-px w-12 bg-[#c1121f]/40" />
          <span>{cacheReady ? (preparing ? "Warming" : "Flip") : "Caching"}</span>
        </div>
        <button
          type="button"
          onClick={flipNext}
          disabled={!canNext}
          className="rounded-full border border-[#c1121f]/30 bg-black/50 px-4 py-2 text-[#f4f1ea]/80 transition disabled:opacity-30 hover:bg-black/60"
        >
          Next
        </button>
      </div>

      <div className="relative select-none">
        <div
          className="relative mx-auto w-full max-w-[1100px]"
          style={{ perspective: "2600px" }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") flipNext();
            if (e.key === "ArrowLeft") flipPrev();
          }}
          tabIndex={0}
        >
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[#c1121f]/25 bg-black/30 soft-card-shadow"
            style={{ isolation: "isolate", contain: "paint" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 50%, rgba(193,18,31,0.10), transparent 44%), linear-gradient(90deg, rgba(0,0,0,0.16), transparent 20%, rgba(0,0,0,0.16))",
              }}
            />

            <PortfolioImage
              src={current}
              alt="Zine spread"
              label="Zine spread"
              className="absolute inset-0 h-full w-full object-contain"
              decoding="sync"
              loading="eager"
              draggable={false}
            />

            {flip ? (
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ opacity: revealOpacity }}
              >
                <img
                  src={flip.revealTexture}
                  alt="Zine revealed target"
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
              </motion.div>
            ) : null}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-[18px] -translate-x-1/2 opacity-80"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.22) 60%, transparent)",
              }}
            />

            {flip ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[38px] -translate-x-1/2"
                style={{
                  opacity: gutterOcclusionOpacity,
                  backgroundImage:
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.32) 58%, transparent)",
                }}
              />
            ) : null}

            <AnimatePresence>
              {flip ? (
                <motion.div
                  key={flip.token}
                  className="absolute inset-0 will-change-transform"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: turnToAngle }}
                  transition={FLIP_MOTION}
                  style={{
                    rotateY: rotate,
                    transformStyle: "preserve-3d",
                    transformOrigin: `${originX} 50%`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translate3d(0,0,0)",
                  }}
                  onAnimationComplete={() => {
                    setFlip((active) => {
                      if (!active || active.token !== flip.token) return active;
                      setIndex(active.toIndex);
                      return null;
                    });
                    rotate.set(0);
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(1px)",
                    }}
                  >
                    <img
                      src={flip.frontTexture}
                      alt="Zine turning front"
                      className="absolute inset-0 h-full w-full object-contain"
                      draggable={false}
                    />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: edgeShadowOpacity,
                        backgroundImage:
                          direction === "next"
                            ? "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.62) 58%, transparent 90%)"
                            : "linear-gradient(270deg, rgba(0,0,0,0.06), rgba(0,0,0,0.62) 58%, transparent 90%)",
                      }}
                    />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: highlightOpacity,
                        backgroundImage:
                          direction === "next"
                            ? "linear-gradient(112deg, transparent 36%, rgba(255,255,255,0.16) 52%, transparent 66%)"
                            : "linear-gradient(248deg, transparent 36%, rgba(255,255,255,0.16) 52%, transparent 66%)",
                      }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={flip.backTexture}
                      alt="Zine turning back"
                      className="absolute inset-0 h-full w-full object-contain"
                      draggable={false}
                    />
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: edgeShadowOpacity,
                        backgroundImage:
                          direction === "next"
                            ? "linear-gradient(270deg, rgba(0,0,0,0.08), rgba(0,0,0,0.52) 58%, transparent 90%)"
                            : "linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.52) 58%, transparent 90%)",
                      }}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="absolute inset-0 grid grid-cols-2">
              <button
                type="button"
                aria-label="Previous spread"
                onClick={flipPrev}
                className="cursor-w-resize"
                disabled={!canPrev}
              />
              <button
                type="button"
                aria-label="Next spread"
                onClick={flipNext}
                className="cursor-e-resize"
                disabled={!canNext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
