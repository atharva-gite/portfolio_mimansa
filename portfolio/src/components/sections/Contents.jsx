import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";

export default function Contents({ items }) {
  return (
    <section id="contents" className="relative flex min-h-screen items-center px-6 py-24 sm:px-8 md:px-12 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={staggerContainer}
        className="w-full"
      >
        <Container className="grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
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
            {items.map((item) => (
              <div
                key={item.no}
                className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 py-6 transition duration-500 hover:bg-white/[0.02] sm:grid-cols-[90px_1fr_auto] sm:py-7"
              >
                <div className="text-xl font-medium tracking-[-0.04em] text-white/30 sm:text-2xl">{item.no}</div>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-white transition duration-500 group-hover:translate-x-1 sm:text-2xl md:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/38">{item.note}</p>
                </div>
                <div className="hidden md:block">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-white/24">Section</span>
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
