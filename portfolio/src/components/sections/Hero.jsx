import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import PaperPanel from "../ui/PaperPanel";
import Tape from "../ui/Tape";
import PortfolioImage from "../ui/PortfolioImage";

export default function Hero({ data }) {
  return (
    <section id={data.sectionId} className="relative min-h-screen border-b border-black/10 px-6 py-16 sm:px-10 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
      >
        <Container className="relative">
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <PaperPanel className="relative mx-auto min-h-[70vh] max-w-[1100px] rounded-[32px] bg-[#fdfbf6] p-10 sm:p-14">
            <Tape className="left-[20%] top-[-12px] h-[22px] w-[140px] -rotate-2" />
            <Tape className="right-[18%] top-[-10px] h-[20px] w-[120px] rotate-2" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8">
                <p className="text-[11px] uppercase tracking-[0.45em] text-black/50">{data.subtitle}</p>
                <h1 className="text-[9vw] font-semibold uppercase leading-[0.9] tracking-[-0.06em] text-black sm:text-[6vw] lg:text-[4.6rem]">
                  {data.title}
                </h1>
                <p className="max-w-md text-sm leading-7 text-black/70">
                  {data.note}
                </p>
              </div>

              <div className="relative">
                <div className="absolute -right-6 -top-10 hidden h-20 w-32 border border-black/10 bg-white/90 sm:block" />
                <PortfolioImage
                  src={data.boardImage}
                  alt="Cover board"
                  label="Cover board"
                  className="soft-card-shadow h-full w-full rounded-[18px] border border-black/10 bg-white/80 object-cover"
                />
              </div>
            </div>

            <div className="absolute -left-10 bottom-8 hidden w-40 rotate-[-6deg] sm:block">
              <PortfolioImage
                src={data.card}
                alt="Paper card"
                label="Paper card"
                className="soft-card-shadow h-44 w-full rounded-[14px] border border-black/10 bg-white/80 object-cover"
              />
            </div>

            <div className="absolute right-10 bottom-6 flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-black/50">{data.cta}</span>
              <span className="h-8 w-8 rounded-full border border-black/30" />
            </div>

            <div className="absolute -right-14 top-12 hidden w-36 rotate-[6deg] sm:block">
              <PortfolioImage
                src={data.objects[0]}
                alt="Object study"
                label="Object study"
                className="soft-card-shadow h-32 w-full rounded-[14px] border border-black/10 bg-white/80 object-cover"
              />
            </div>

            <div className="absolute left-8 top-10 hidden w-32 -rotate-[4deg] sm:block">
              <PortfolioImage
                src={data.objects[1]}
                alt="Object detail"
                label="Object detail"
                className="soft-card-shadow h-28 w-full rounded-[14px] border border-black/10 bg-white/80 object-cover"
              />
            </div>

            <div className="absolute left-8 bottom-12 hidden w-44 sm:block">
              <PortfolioImage
                src={data.noteLabel}
                alt="Label"
                label="Cover label"
                className="h-10 w-full border border-black/10 bg-white/70 object-cover"
              />
            </div>
          </PaperPanel>
        </Container>
      </motion.div>
    </section>
  );
}
