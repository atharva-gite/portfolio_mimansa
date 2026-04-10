import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-white selection:text-black">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,#111111,#090909_18%,#080808_100%)]" />
      {children}
    </div>
  );
}
