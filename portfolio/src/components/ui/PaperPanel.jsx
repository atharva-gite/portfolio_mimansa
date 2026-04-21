import React from "react";

export default function PaperPanel({ children, className = "" }) {
  return (
    <div
      className={`relative bg-[#fdfbf5] border border-black/10 paper-shadow ${className}`}
    >
      {children}
    </div>
  );
}
