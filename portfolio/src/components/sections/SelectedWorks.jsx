import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import PortfolioImage from "../ui/PortfolioImage";

export default function SelectedWorks({ data }) {
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

          <motion.div variants={fadeUp} className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-black">Selected Works</h2>
            <p className="mt-4 text-sm text-black/60">{data.intro}</p>
          </motion.div>

          <div className="border-t border-black/20">
            {data.items.map((item) => (
              <div key={item.id} className="grid gap-8 border-b border-black/10 py-10 md:grid-cols-[0.65fr_0.35fr]">
                <div className="flex items-start gap-6">
                  <div className="text-[12px] uppercase tracking-[0.3em] text-black/40">{item.id}</div>
                  <div>
                    <h3 className="text-3xl font-semibold uppercase tracking-[-0.03em] text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-black/60">{item.meta}</p>
                  </div>
                </div>
                <div className="flex items-center justify-start md:justify-end">
                  <PortfolioImage
                    src={item.image}
                    alt={item.title}
                    label={`Work ${item.id}`}
                    className="h-24 w-full max-w-[180px] rounded-[12px] border border-black/10 bg-white/80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
