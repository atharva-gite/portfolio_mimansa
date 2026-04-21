import React from "react";

export default function PolaroidFrame({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[12px] bg-white border border-black/10 soft-card-shadow p-3 ${className}`}
    >
      {children}
      <div className="mt-3 h-6 w-full bg-white" />
    </div>
  );
}
