import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import PortfolioImage from "../ui/PortfolioImage";

export default function Experience({ data }) {
  return (
    <section id={data.sectionId} className="relative border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={staggerContainer}
      >
        <Container>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
            <motion.div variants={fadeUp} className="relative">
              <div className="relative w-56 rotate-[-4deg]">
                <PortfolioImage
                  src={data.noteImage}
                  alt="Pinned note"
                  label="Experience note"
                  className="soft-card-shadow h-52 w-full rounded-[16px] border border-black/10 bg-white/90 object-cover"
                />
                <div className="absolute -top-4 left-6 h-10 w-10">
                  <PortfolioImage
                    src={data.clip}
                    alt="Clip"
                    label="Paper clip"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
              <p className="mt-8 text-sm text-black/60">{data.note}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <div className="border-t border-black/20 pt-12">
                <div className="grid gap-10 md:grid-cols-3">
                  {data.entries.map((entry) => (
                    <div key={entry.year} className="space-y-4">
                      <div className="h-6 w-px bg-black/30" />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">{entry.year}</p>
                        <h3 className="mt-2 text-lg font-semibold uppercase text-black">{entry.role}</h3>
                        <p className="text-sm text-black/60">{entry.place}</p>
                        <p className="mt-3 text-sm leading-6 text-black/70">{entry.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
