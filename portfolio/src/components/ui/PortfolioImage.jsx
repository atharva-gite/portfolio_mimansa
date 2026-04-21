import React, { useEffect, useState } from "react";

const logged = new Set();

export default function PortfolioImage({ src, alt, label, className = "" }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    if (!src) {
      setFailed(true);
    }
  }, [src]);

  useEffect(() => {
    if (failed) {
      const key = `${label || alt || "Image"}::${src || "(missing path)"}`;
      if (!logged.has(key)) {
        logged.add(key);
        console.warn(`[PortfolioImage Missing] ${label || alt || "Image"} -> ${src || "(missing path)"}`);
      }
    }
  }, [failed, label, alt, src]);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-black/30 bg-white/70 px-4 py-6 text-center text-[11px] uppercase tracking-[0.25em] text-black/60 ${className}`}
      >
        <span className="text-[10px] font-semibold text-black/50">{label || alt || "Image"}</span>
        <span className="text-[10px] tracking-normal text-black/50">{src || "(missing path)"}</span>
        <span className="text-[10px] tracking-normal text-black/40">Replace this image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
