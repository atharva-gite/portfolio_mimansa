import { assets } from "./assets";

export const cover = {
  sectionId: "cover",
  index: "01",
  label: "Cover",
  title: "MIMANSA ATHAWALE",
  subtitle: "Industrial Design Portfolio 2025–2026",
  note: "Product stories and form studies",
  cta: "Start",
  boardImage: assets.cover.boardBg,
  objects: [assets.cover.object01, assets.cover.object02],
  card: assets.cover.paperCard,
  noteLabel: assets.cover.noteLabel,
};

export const about = {
  sectionId: "about",
  index: "02",
  label: "About Me",
  introTitle: "Hello, I am Mimansa",
  intro:
    "Industrial designer focused on calm, tactile products and human-scale objects. I combine form exploration with material sensitivity and narrative clarity.",
  profileMain: assets.about.profileMain,
  profileSecondary: assets.about.profileSecondary,
  details: [
    { label: "Location", value: "Pune, India" },
    { label: "Focus", value: "Product Design / CMF / Prototyping" },
    { label: "Tools", value: "SolidWorks, KeyShot, Adobe CC" },
  ],
  rightColumn: [
    {
      title: "Education",
      items: ["B.Des Industrial Design", "MIT Institute of Design"],
      icon: assets.about.iconBooks,
    },
    {
      title: "Skills",
      items: ["Form Development", "CAD Modelling", "Visual Storytelling", "Prototyping"],
      icon: assets.about.iconPencil,
    },
    {
      title: "Experience",
      items: ["Intern - Product Studio", "Freelance ID Projects"],
      icon: assets.about.iconBag,
    },
    {
      title: "Extras",
      items: ["Model Making", "Material Research"],
      icon: assets.about.iconComputer,
    },
    {
      title: "Languages",
      items: ["English", "Hindi", "Marathi"],
      icon: assets.about.iconGlobe,
    },
  ],
};

export const experience = {
  sectionId: "experience",
  index: "03",
  label: "Experience",
  note: "Selected milestones",
  entries: [
    {
      year: "2025",
      role: "Industrial Design Intern",
      place: "Studio Form",
      detail: "Concept modeling, CMF decks, and mockups.",
      align: "left",
    },
    {
      year: "2024",
      role: "Freelance Designer",
      place: "Independent",
      detail: "Small-batch product concepts and renders.",
      align: "center",
    },
    {
      year: "2023",
      role: "Research Assistant",
      place: "Design Lab",
      detail: "User research, trend mapping, and prototyping.",
      align: "right",
    },
  ],
  noteImage: assets.experience.notePaper,
  clip: assets.experience.clip,
};

export const education = {
  sectionId: "education",
  index: "04",
  label: "Education",
  timeline: [
    {
      period: "2021 — 2025",
      title: "B.Des Industrial Design",
      place: "MIT Institute of Design",
      detail: "Focus on product systems, CMF, and ergonomics.",
    },
    {
      period: "2019 — 2021",
      title: "Foundation Studies",
      place: "Design Foundation Program",
      detail: "Form studies, drawing, and model-making.",
    },
  ],
  stickyNotes: [
    {
      title: "Awards",
      body: "Top 5 in National Design Showcase 2024",
      image: assets.education.sticky01,
    },
    {
      title: "Workshops",
      body: "Material Lab / CMF Intensive",
      image: assets.education.sticky02,
    },
    {
      title: "Activities",
      body: "Design Club Coordinator",
      image: assets.education.sticky03,
    },
  ],
};

export const works = {
  sectionId: "works",
  index: "05",
  label: "Selected Works",
  intro: "A curated spread of projects and explorations.",
  items: [
    {
      id: "01",
      title: "Project Vesper",
      meta: "Consumer Object · 2025",
      image: assets.works.project01,
    },
    {
      id: "02",
      title: "Lightweight Task Chair",
      meta: "Furniture · 2024",
      image: assets.works.project02,
    },
    {
      id: "03",
      title: "Wearable Ritual Device",
      meta: "Concept · 2024",
      image: assets.works.project03,
    },
    {
      id: "04",
      title: "Kitchen Companion",
      meta: "Appliance · 2023",
      image: assets.works.project04,
    },
    {
      id: "05",
      title: "Material Study: Stone",
      meta: "CMF · 2023",
      image: assets.works.project05,
    },
  ],
};
