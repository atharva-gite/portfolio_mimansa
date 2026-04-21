import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import StickyNote from "../ui/StickyNote";
import PortfolioImage from "../ui/PortfolioImage";

export default function Education({ data }) {
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

          <motion.div variants={fadeUp} className="space-y-12">
            <div className="space-y-10 border-t border-black/20 pt-10">
              {data.timeline.map((item) => (
                <div key={item.period} className="grid gap-6 md:grid-cols-[0.3fr_0.7fr]">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-black/50">{item.period}</div>
                  <div>
                    <h3 className="text-xl font-semibold uppercase text-black">{item.title}</h3>
                    <p className="text-sm text-black/60">{item.place}</p>
                    <p className="mt-2 text-sm leading-6 text-black/70">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {data.stickyNotes.map((note) => (
                <StickyNote key={note.title} className="p-5">
                  <div className="flex items-center gap-3">
                    <PortfolioImage
                      src={note.image}
                      alt={note.title}
                      label={`${note.title} sticky`}
                      className="h-12 w-12 rounded-[12px] border border-black/10 bg-white/70 object-cover"
                    />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-black/60">{note.title}</p>
                      <p className="mt-2 text-sm text-black/70">{note.body}</p>
                    </div>
                  </div>
                </StickyNote>
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
