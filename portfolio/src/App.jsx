import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, MoveDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const projects = [
  {
    id: "01",
    title: "Project Title One",
    category: "Consumer Product / 2026",
    image: "/assets/projects/project-01.jpg", // replace later
  },
  {
    id: "02",
    title: "Project Title Two",
    category: "Furniture / Material Study",
    image: "/assets/projects/project-02.jpg", // replace later
  },
  {
    id: "03",
    title: "Project Title Three",
    category: "Wearable / Concept Design",
    image: "/assets/projects/project-03.jpg", // replace later
  },
  {
    id: "04",
    title: "Project Title Four",
    category: "Home Object / CMF",
    image: "/assets/projects/project-04.jpg", // replace later
  },
  {
    id: "05",
    title: "Project Title Five",
    category: "Speculative Design",
    image: "/assets/projects/project-05.jpg", // replace later
  },
  {
    id: "06",
    title: "Project Title Six",
    category: "Prototype / 3D Form",
    image: "/assets/projects/project-06.jpg", // replace later
  },
];

const contents = [
  { no: "01", title: "Cover", note: "A quiet first impression" },
  { no: "02", title: "Design Statement", note: "Intent and perspective" },
  { no: "03", title: "About Me", note: "Background, tools, process" },
  { no: "04", title: "Selected Works", note: "Chosen projects and explorations" },
  { no: "05", title: "Contents", note: "Portfolio index" },
  { no: "06", title: "Case Study One", note: "Replace with real project later" },
  { no: "07", title: "Case Study Two", note: "Replace with real project later" },
  { no: "08", title: "Contact", note: "Email, socials, availability" },
];

const skills = [
  "Industrial Design",
  "CAD Modeling",
  "Product Visualization",
  "Prototype Development",
  "CMF Strategy",
  "User-Centered Design",
  "Storyboarding",
  "Physical Mockups",
  "Rendering",
  "Design Research",
];

function SectionLabel({ index, label }) {
  return (
    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-white/45 md:text-[11px]">
      <span className="font-medium">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.15\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.7\"/></svg>')",
      }}
    />
  );
}

export default function IndustrialDesignPortfolio() {
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-white selection:text-black">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,#111111, #090909_18%, #080808_100%)]" />

      {/* 
        Suggested fonts to import in your app layout/head:
        1) Manrope + Cormorant Garamond
        2) Inter + Instrument Serif
        3) Satoshi + EB Garamond

        Example:
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />
      */}

      {/* SECTION 01 — HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden border-b border-white/10">
        <img
          src="/assets/hero/hero-cover.jpg" // replace later
          alt="Portfolio cover"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_22%)]" />
        <GrainOverlay />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainer}
          className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-between px-6 pb-8 pt-24 sm:px-8 md:px-12 md:pb-10 lg:px-16"
        >
          <motion.div variants={fadeUp} className="mb-16 md:mb-24">
            <SectionLabel index="01" label="Portfolio" />
          </motion.div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.65fr_0.7fr]">
            <motion.div variants={fadeUp}>
              <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-white/50 sm:text-xs">
                Industrial Design Portfolio 2025–2026
              </p>
              <h1
                className="max-w-6xl text-[19vw] font-semibold uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-[15vw] md:text-[10.5vw] lg:text-[9rem] xl:text-[11rem]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                HER NAME
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-6 pb-3 lg:items-end lg:text-right"
            >
              <p className="max-w-sm text-sm leading-6 text-white/58 md:text-[15px] md:leading-7">
                A curated selection of form, material, and product thinking shaped into a refined digital portfolio experience.
              </p>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/55">
                <span>Scroll</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                  <MoveDown className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 02 — INTRO / DESIGN STATEMENT */}
      <section className="relative flex min-h-screen items-center justify-center border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="mb-14">
            <SectionLabel index="02" label="Design Statement" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-4xl text-balance text-[2rem] font-medium leading-[1.15] tracking-[-0.05em] text-white sm:text-[2.7rem] md:text-[3.8rem] lg:text-[4.8rem]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            I design objects that feel calm, intentional, and quietly memorable—
            where form follows feeling, materials speak softly, and every detail earns its place.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-sm leading-7 text-white/46 md:text-[15px]"
          >
            Replace this with her own statement. Keep it short, poetic, and deeply personal.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 03 — ABOUT ME */}
      <section className="relative min-h-screen border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={staggerContainer}
          className="mx-auto max-w-[1500px]"
        >
          <motion.div variants={fadeUp} className="mb-14 md:mb-20">
            <SectionLabel index="03" label="About Me" />
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] to-transparent opacity-70" />
                <img
                  src="/assets/profile/profile.jpg" // replace later
                  alt="Profile"
                  className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/35">
                Profile image / Studio portrait / Process shot
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col justify-between">
              <div>
                <h2
                  className="max-w-2xl text-3xl font-medium leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-[3.7rem]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Designing products through clarity, emotion, and material sensitivity.
                </h2>

                <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
                  <div>
                    <p className="text-sm leading-7 text-white/66 md:text-[15px] md:leading-8">
                      Replace this with a concise bio. Mention her design background, what kinds of products or systems interest her,
                      and how she approaches research, form development, prototyping, and storytelling.
                    </p>
                    <p className="mt-6 text-sm leading-7 text-white/46 md:text-[15px] md:leading-8">
                      A good premium portfolio bio is not too long. It should sound thoughtful, calm, and specific rather than overly promotional.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Location</p>
                      <p className="mt-2 text-white/78">City, Country</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Focus</p>
                      <p className="mt-2 text-white/78">Product Design / Furniture / Material Exploration</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Education</p>
                      <p className="mt-2 text-white/78">Design School Name</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-16">
                <div className="mb-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Tools & Skills</p>
                  <p className="text-xs text-white/30">Edit freely</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/72 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 04 — SELECTED WORKS */}
      <section className="relative min-h-screen border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer}
          className="mx-auto max-w-[1550px]"
        >
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <SectionLabel index="04" label="Selected Works" />
              <h2
                className="mt-6 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-[3.8rem]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                A focused selection of projects, prototypes, and visual narratives.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/50 md:text-right">
              These cards are built to feel tactile and cinematic. Replace each placeholder with project cover imagery later.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] ${
                  index % 3 === 0 ? "xl:translate-y-10" : index % 3 === 1 ? "xl:-translate-y-2" : "xl:translate-y-20"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-white/0 transition duration-500 group-hover:bg-white/[0.03]" />

                  <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5 text-[10px] uppercase tracking-[0.3em] text-white/55">
                    <span>{project.id}</span>
                    <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-sm">
                      View
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <div className="translate-y-3 transition duration-500 group-hover:translate-y-0">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                        {project.category}
                      </p>
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
                          {project.title}
                        </h3>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowDownRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 05 — CONTENTS PAGE */}
      <section className="relative flex min-h-screen items-center px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={staggerContainer}
          className="mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="05" label="Contents" />
            <h2
              className="mt-8 text-4xl font-medium leading-none tracking-[-0.06em] text-white sm:text-5xl md:text-6xl lg:text-[5rem]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Index
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/48">
              This section gives the website a portfolio-book quality. It works especially well before deeper case studies.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="divide-y divide-white/10 border-t border-white/10">
            {contents.map((item) => (
              <div
                key={item.no}
                className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 py-6 transition duration-300 hover:bg-white/[0.02] sm:grid-cols-[90px_1fr_auto] sm:py-7"
              >
                <div className="text-xl font-medium tracking-[-0.04em] text-white/30 sm:text-2xl">
                  {item.no}
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-white transition duration-300 group-hover:translate-x-1 sm:text-2xl md:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/38">{item.note}</p>
                </div>
                <div className="hidden md:block">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-white/24">
                    Section
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
