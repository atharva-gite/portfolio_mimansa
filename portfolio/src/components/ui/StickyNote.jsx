import React from "react";

export default function StickyNote({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[18px] bg-[#f4e3a3] border border-black/10 soft-card-shadow ${className}`}
    >
      {children}
    </div>
  );
}
