import React from "react";
import SmoothScroll from "../components/layout/SmoothScroll";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import SelectedWorks from "../components/sections/SelectedWorks";
import { cover, about, experience, education, works } from "../data/siteData";

export default function Home() {
  return (
    <SmoothScroll>
      <Hero data={cover} />
      <About data={about} />
      <Experience data={experience} />
      <Education data={education} />
      <SelectedWorks data={works} />
    </SmoothScroll>
  );
}

