import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1b1b1b]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#f6f4ef] paper-texture" />
      {children}
    </div>
  );
}
