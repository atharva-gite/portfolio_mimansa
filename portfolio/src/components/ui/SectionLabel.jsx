import React from "react";

export default function SectionLabel({ index, label, className = "" }) {
  return (
    <div className={`flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-white/45 md:text-[11px] ${className}`}>
      <span className="font-medium">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}
