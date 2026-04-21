import React from "react";

export default function Tape({ className = "" }) {
  return (
    <div
      className={`absolute bg-[#e7ddc7]/80 border border-black/10 shadow-[0_6px_12px_rgba(0,0,0,0.08)] ${className}`}
    />
  );
}
