import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import PaperPanel from "../ui/PaperPanel";
import PolaroidFrame from "../ui/PolaroidFrame";
import Tape from "../ui/Tape";
import PortfolioImage from "../ui/PortfolioImage";

export default function About({ data }) {
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

          <PaperPanel className="rounded-[28px] bg-[#fdfbf6] p-8 sm:p-12">
            <Tape className="left-[10%] top-[-12px] h-[20px] w-[110px] -rotate-1" />

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-8">
                <div className="relative">
                  <div className="relative w-[70%]">
                    <PolaroidFrame className="rotate-[-2deg]">
                      <PortfolioImage
                        src={data.profileMain}
                        alt="Profile main"
                        label="About profile main"
                        className="h-60 w-full rounded-[8px] object-cover"
                      />
                    </PolaroidFrame>
                  </div>
                  <div className="absolute left-[35%] top-32 w-[60%]">
                    <PolaroidFrame className="rotate-[4deg]">
                      <PortfolioImage
                        src={data.profileSecondary}
                        alt="Profile secondary"
                        label="About profile secondary"
                        className="h-48 w-full rounded-[8px] object-cover"
                      />
                    </PolaroidFrame>
                  </div>
                </div>

                <div className="space-y-4 border border-black/10 bg-white/70 p-5">
                  <p className="text-[12px] uppercase tracking-[0.28em] text-black/60">Personal info</p>
                  {data.details.map((item) => (
                    <div key={item.label} className="flex justify-between border-t border-black/10 pt-3 text-sm">
                      <span className="text-black/60">{item.label}</span>
                      <span className="font-medium text-black">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-black/10 bg-white/80 p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-black/50">Introduction</p>
                  <p className="mt-4 text-sm leading-7 text-black/70">{data.intro}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-semibold uppercase tracking-[-0.03em] text-black">
                    {data.introTitle}
                  </h2>
                </div>

                <div className="grid gap-6">
                  {data.rightColumn.map((block) => (
                    <div key={block.title} className="flex gap-4 border-t border-black/10 pt-4">
                      <PortfolioImage
                        src={block.icon}
                        alt={block.title}
                        label={`${block.title} icon`}
                        className="h-10 w-10 rounded-full border border-black/10 bg-white/80 object-cover"
                      />
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.3em] text-black/60">{block.title}</p>
                        <ul className="mt-3 space-y-1 text-sm text-black/70">
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PaperPanel>
        </Container>
      </motion.div>
    </section>
  );
}
