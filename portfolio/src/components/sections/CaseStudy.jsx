import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, textReveal } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import RevealImage from "../ui/RevealImage";
import GrainOverlay from "../ui/GrainOverlay";

export default function CaseStudy({ data }) {
  return (
    <section id={data.sectionId} className="relative border-t border-white/10">
      <div className="relative flex min-h-screen items-end overflow-hidden border-b border-white/10">
        <img src={data.heroImage} alt={data.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        <GrainOverlay />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="relative z-10 w-full"
        >
          <Container className="px-6 pb-16 pt-28 sm:px-8 md:px-12 lg:px-16">
            <motion.div variants={fadeUp} className="mb-10">
              <SectionLabel index={data.index} label={data.label} />
            </motion.div>
            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
              <motion.div variants={fadeUp}>
                <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-white/55">{data.category}</p>
                <h2
                  className="text-[15vw] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-white sm:text-[10vw] md:text-[7rem]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {data.title}
                </h2>
              </motion.div>
              <motion.p variants={fadeUp} className="text-sm leading-7 text-white/62 md:text-[15px]">
                {data.intro}
              </motion.p>
            </div>
          </Container>
        </motion.div>
      </div>

      <div className="border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <Container className="max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-10 lg:grid-cols-3"
          >
            {data.overview.map((item) => (
              <motion.div key={item.title} variants={textReveal} className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">{item.title}</p>
                <p className="text-sm leading-7 text-white/65 md:text-[15px]">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      <div className="space-y-24 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
        <Container className="max-w-[1500px] space-y-24">
          {data.sections.map((section, index) => {
            const isImageLeft = section.layout === "image-left";
            return (
              <motion.div
                key={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className={`grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] ${
                  isImageLeft ? "" : "lg:[&>div:first-child]:order-2"
                }`}
              >
                <RevealImage
                  src={section.image}
                  alt={section.title}
                  className="rounded-[28px] border border-white/10"
                  imageClassName="aspect-[5/4]"
                  caption={section.caption}
                />
                <motion.div variants={textReveal} className="space-y-6">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-[3rem]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {section.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/62 md:text-[15px]">{section.body}</p>
                </motion.div>
              </motion.div>
            );
          })}

          <div className="grid gap-8 lg:grid-cols-2">
            {data.gallery.map((image, index) => (
              <RevealImage
                key={image}
                src={image}
                alt={`${data.title} detail ${index + 1}`}
                className="rounded-[28px] border border-white/10"
                imageClassName="aspect-[4/3]"
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
