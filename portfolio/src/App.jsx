import React from "react";
import PageWrapper from "./components/layout/PageWrapper";
import SmoothScroll from "./components/layout/SmoothScroll";
import FloatingNav from "./components/ui/FloatingNav";
import Hero from "./components/sections/Hero";
import DesignStatement from "./components/sections/DesignStatement";
import About from "./components/sections/About";
import SelectedWorks from "./components/sections/SelectedWorks";
import Contents from "./components/sections/Contents";
import CaseStudy from "./components/sections/CaseStudy";
import { hero, designStatement, about, skills, projects, contents, caseStudy } from "./data/siteData";

export default function App() {
  return (
    <PageWrapper>
      <SmoothScroll>
        <FloatingNav />
        <Hero data={hero} />
        <DesignStatement data={designStatement} />
        <About data={about} skills={skills} />
        <SelectedWorks projects={projects} />
        <Contents items={contents} />
        <CaseStudy data={caseStudy} />
      </SmoothScroll>
    </PageWrapper>
  );
}
