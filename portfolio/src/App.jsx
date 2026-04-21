import React, { useEffect } from "react";
import PageWrapper from "./components/layout/PageWrapper";
import SmoothScroll from "./components/layout/SmoothScroll";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import SelectedWorks from "./components/sections/SelectedWorks";
import { assetsChecklist } from "./data/assets";
import { cover, about, experience, education, works } from "./data/siteData";

export default function App() {
  useEffect(() => {
    console.group("[Portfolio Assets Checklist]");
    assetsChecklist.forEach((path) => console.log(`- ${path}`));
    console.groupEnd();
  }, []);

  return (
    <PageWrapper>
      <SmoothScroll>
        <Hero data={cover} />
        <About data={about} />
        <Experience data={experience} />
        <Education data={education} />
        <SelectedWorks data={works} />
      </SmoothScroll>
    </PageWrapper>
  );
}
