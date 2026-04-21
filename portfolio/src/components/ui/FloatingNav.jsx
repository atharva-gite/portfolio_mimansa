import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections } from "../../data/navigation";
import { slowFade } from "../../utils/animations";

const getActiveSection = () => {
  let activeId = navSections[0]?.id || "";
  navSections.forEach((section) => {
    const el = document.getElementById(section.id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= 180) {
      activeId = section.id;
    }
  });
  return activeId;
};

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(navSections[0]?.id || "");

  const heroId = useMemo(() => navSections[0]?.id || "hero", []);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById(heroId);
      if (hero) {
        const { bottom } = hero.getBoundingClientRect();
        setVisible(bottom < window.innerHeight * 0.4);
      }
      setActive(getActiveSection());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroId]);

  const handleScroll = (id) => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -40, duration: 1.4 });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          variants={slowFade}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-4 text-[10px] uppercase tracking-[0.35em] text-white/50 backdrop-blur-md md:block"
        >
          <ul className="flex flex-col gap-4">
            {navSections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handleScroll(section.id)}
                  className={`flex items-center gap-3 transition duration-500 hover:text-white ${
                    active === section.id ? "text-white" : "text-white/50"
                  }`}
                >
                  <span className="font-medium">{section.index}</span>
                  <span className="h-px w-6 bg-white/20" />
                  <span>{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
