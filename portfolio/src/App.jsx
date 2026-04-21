import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageWrapper from "./components/layout/PageWrapper";
import ScrollToTop from "./components/layout/ScrollToTop";
import { assetsChecklist } from "./data/assets";
import Home from "./pages/Home";
import Work from "./pages/Work";

export default function App() {
  useEffect(() => {
    console.group("[Portfolio Assets Checklist]");
    assetsChecklist.forEach((path) => console.log(`- ${path}`));
    console.groupEnd();
  }, []);

  return (
    <PageWrapper>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<Work />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
}
