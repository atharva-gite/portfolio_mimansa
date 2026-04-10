import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";

export default function SelectedWorks({ projects }) {
  return (
    <section id="works" className="relative min-h-screen border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer}
      >
        <Container className="max-w-[1550px]">
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <SectionLabel index="04" label="Selected Works" />
              <h2
                className="mt-6 max-w-3xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl md:text-5xl lg:text-[3.8rem]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                A focused selection of projects, prototypes, and visual narratives.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/50 md:text-right">
              These cards are built to feel tactile and cinematic. Replace each placeholder with project cover imagery later.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] ${
                  index % 3 === 0 ? "xl:translate-y-10" : index % 3 === 1 ? "xl:-translate-y-2" : "xl:translate-y-20"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover grayscale transition duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent opacity-90 transition duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-white/0 transition duration-700 group-hover:bg-white/[0.03]" />

                  <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5 text-[10px] uppercase tracking-[0.3em] text-white/55">
                    <span>{project.id}</span>
                    <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 backdrop-blur-sm">
                      View
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <div className="translate-y-3 transition duration-700 group-hover:translate-y-0">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                        {project.category}
                      </p>
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
                          {project.title}
                        </h3>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowDownRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
