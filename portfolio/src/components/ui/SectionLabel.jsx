import React from "react";

export default function SectionLabel({ index, label, className = "" }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] ${className || "text-black/60"}`}>
      <span className="font-medium">{index}</span>
      <span className="h-px w-10 bg-current/25" />
      <span>{label}</span>
    </div>
  );
}
