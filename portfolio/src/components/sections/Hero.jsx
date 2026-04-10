import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveDown } from "lucide-react";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import GrainOverlay from "../ui/GrainOverlay";

export default function Hero({ data }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -90]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.05]);

  return (
    <section id={data.sectionId} className="relative flex min-h-screen items-end overflow-hidden border-b border-white/10">
      <motion.img
        src={data.image}
        alt="Portfolio cover"
        style={{ y, scale }}
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
        className="relative z-10 w-full"
      >
        <Container className="flex flex-col justify-between px-6 pb-8 pt-24 sm:px-8 md:px-12 md:pb-10 lg:px-16">
          <motion.div variants={fadeUp} className="mb-16 md:mb-24">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.65fr_0.7fr]">
            <motion.div variants={fadeUp}>
              <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-white/50 sm:text-xs">
                {data.subtitle}
              </p>
              <h1
                className="max-w-6xl text-[19vw] font-semibold uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-[15vw] md:text-[10.5vw] lg:text-[9rem] xl:text-[11rem]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {data.title}
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-6 pb-3 lg:items-end lg:text-right"
            >
              <p className="max-w-sm text-sm leading-6 text-white/58 md:text-[15px] md:leading-7">
                {data.intro}
              </p>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/55">
                <span>Scroll</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                  <MoveDown className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
