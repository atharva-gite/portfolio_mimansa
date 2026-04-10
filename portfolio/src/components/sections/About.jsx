import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import RevealImage from "../ui/RevealImage";

export default function About({ data, skills }) {
  return (
    <section
      id={data.sectionId}
      className="relative min-h-screen border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={staggerContainer}
      >
        <Container className="max-w-[1500px]">
          <motion.div variants={fadeUp} className="mb-14 md:mb-20">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
            <motion.div variants={fadeUp} className="space-y-4">
              <RevealImage
                src={data.profileImage}
                alt="Profile"
                className="rounded-[28px] border border-white/10 bg-white/[0.03]"
                imageClassName="aspect-[4/5] grayscale"
                caption={data.profileCaption}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col justify-between">
              <div>
                <h2
                  className="max-w-2xl text-3xl font-medium leading-tight tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-[3.7rem]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {data.headline}
                </h2>

                <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
                  <div>
                    <p className="text-sm leading-7 text-white/66 md:text-[15px] md:leading-8">
                      {data.bioPrimary}
                    </p>
                    <p className="mt-6 text-sm leading-7 text-white/46 md:text-[15px] md:leading-8">
                      {data.bioSecondary}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {data.meta.map((item) => (
                      <div key={item.label} className="border-t border-white/10 pt-4">
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">{item.label}</p>
                        <p className="mt-2 text-white/78">{item.value}</p>
                      </div>
                    ))}
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
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/72 backdrop-blur-sm transition duration-700 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      {skill}
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
