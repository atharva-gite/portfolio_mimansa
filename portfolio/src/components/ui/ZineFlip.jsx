import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioImage from "./PortfolioImage";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const BOOK = {
  // These are percentage insets for the photographed magazine inside the full image.
  // Tweak if your source images have different margins.
  x0: 6,
  x1: 94,
  y0: 12,
  y1: 95,
  gutter: 2.0,
};

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

export default function ZineFlip({ pages = [], initialIndex = 0 }) {
  const safePages = useMemo(() => pages.filter(Boolean), [pages]);
  const [index, setIndex] = useState(clamp(initialIndex, 0, Math.max(0, safePages.length - 1)));
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState("next"); // "next" | "prev"
  const [flipToken, setFlipToken] = useState(0);
  const flippingRef = useRef(false);
  const completedTokenRef = useRef(-1);

  const canPrev = index > 0;
  const canNext = index < safePages.length - 1;

  const current = safePages[index];
  const next = safePages[index + 1];
  const prev = safePages[index - 1];

  useEffect(() => {
    // Preload adjacent spreads to reduce decode jank during flips.
    [current, next, prev].filter(Boolean).forEach((src) => {
      const img = new Image();
      img.src = src;
      // decode() is best-effort; ignore failures.
      img.decode?.().catch(() => {});
    });
  }, [current, next, prev]);

  const flipNext = () => {
    if (!canNext || flippingRef.current) return;
    setDir("next");
    flippingRef.current = true;
    setFlipToken((t) => t + 1);
    setFlipping(true);
  };

  const flipPrev = () => {
    if (!canPrev || flippingRef.current) return;
    setDir("prev");
    flippingRef.current = true;
    setFlipToken((t) => t + 1);
    setFlipping(true);
  };

  if (safePages.length === 0) {
    return (
      <div className="border border-dashed border-[#c1121f]/40 bg-black/40 p-6 text-sm text-[#f4f1ea]/80">
        No zine pages provided.
      </div>
    );
  }

  const baseSpread = current;
  const flipBack = dir === "next" ? next : prev;

  const hasFlipBack = Boolean(flipBack);
  const originX = `${(BOOK.x0 + BOOK.x1) / 2}%`;

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="flex items-center justify-between pb-6 text-[11px] uppercase tracking-[0.35em] text-[#f4f1ea]/70">
        <button
          type="button"
          onClick={flipPrev}
          disabled={!canPrev || flipping}
          className="rounded-full border border-[#c1121f]/30 bg-black/50 px-4 py-2 text-[#f4f1ea]/80 transition disabled:opacity-30 hover:bg-black/60"
        >
          Prev
        </button>
        <div className="flex items-center gap-3">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(safePages.length).padStart(2, "0")}
          </span>
          <span className="h-px w-12 bg-[#c1121f]/40" />
          <span>Flip</span>
        </div>
        <button
          type="button"
          onClick={flipNext}
          disabled={!canNext || flipping}
          className="rounded-full border border-[#c1121f]/30 bg-black/50 px-4 py-2 text-[#f4f1ea]/80 transition disabled:opacity-30 hover:bg-black/60"
        >
          Next
        </button>
      </div>

      <div className="relative select-none">
        {/* Book viewport: ONLY this area flips */}
        <div
          className="relative mx-auto w-full max-w-[1100px]"
          style={{ perspective: "2600px" }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") flipNext();
            if (e.key === "ArrowLeft") flipPrev();
          }}
          tabIndex={0}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[#c1121f]/25 bg-black/30 soft-card-shadow">
            {/* Static backdrop (does NOT flip): subtle wash + paper shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 50%, rgba(193,18,31,0.10), transparent 44%), linear-gradient(90deg, rgba(0,0,0,0.16), transparent 20%, rgba(0,0,0,0.16))",
              }}
            />

            {/* Base spread stays whole (keeps background continuous and avoids seams) */}
            <PortfolioImage
              src={baseSpread}
              alt="Zine spread"
              label="Zine spread"
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />

            {/* Center gutter shading */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-[18px] -translate-x-1/2 opacity-80"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.22) 60%, transparent)",
              }}
            />

            {/* Turning page: only a HALF flips, not the background */}
            <AnimatePresence>
              {flipping ? (
                <motion.div
                  key={`${index}-${dir}-${flipToken}`}
                  className="absolute inset-0 will-change-transform"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: dir === "next" ? -180 : 180 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: `${originX} 50%`,
                  }}
                  onAnimationComplete={() => {
                    if (completedTokenRef.current === flipToken) return;
                    completedTokenRef.current = flipToken;

                    setIndex((i) =>
                      dir === "next" ? Math.min(i + 1, safePages.length - 1) : Math.max(i - 1, 0),
                    );
                    flippingRef.current = false;
                    setFlipping(false);
                  }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <PortfolioImage
                      src={current}
                      alt="Zine flipping front"
                      label="Zine flipping front"
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{ clipPath: dir === "next" ? clipRightPage() : clipLeftPage() }}
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          dir === "next"
                            ? "linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42) 62%, transparent 92%)"
                            : "linear-gradient(270deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42) 62%, transparent 92%)",
                        clipPath: dir === "next" ? clipRightPage() : clipLeftPage(),
                      }}
                    />
                  </div>

                  {/* Back face */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <PortfolioImage
                      src={hasFlipBack ? flipBack : current}
                      alt="Zine flipping back"
                      label="Zine flipping back"
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{ clipPath: dir === "next" ? clipLeftPage() : clipRightPage() }}
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          dir === "next"
                            ? "linear-gradient(270deg, rgba(0,0,0,0.10), rgba(0,0,0,0.44) 62%, transparent 92%)"
                            : "linear-gradient(90deg, rgba(0,0,0,0.10), rgba(0,0,0,0.44) 62%, transparent 92%)",
                        clipPath: dir === "next" ? clipLeftPage() : clipRightPage(),
                      }}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Click areas (inside the book viewport only) */}
            <div className="absolute inset-0 grid grid-cols-2">
              <button
                type="button"
                aria-label="Previous spread"
                onClick={flipPrev}
                className="cursor-w-resize"
                disabled={!canPrev || flipping}
              />
              <button
                type="button"
                aria-label="Next spread"
                onClick={flipNext}
                className="cursor-e-resize"
                disabled={!canNext || flipping}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
