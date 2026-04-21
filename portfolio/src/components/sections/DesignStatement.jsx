import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";

export default function DesignStatement({ data }) {
  return (
    <section
      id={data.sectionId}
      className="relative flex min-h-screen items-center justify-center border-b border-white/10 px-6 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
        className="w-full"
      >
        <Container className="flex max-w-5xl flex-col items-center text-center">
          <motion.div variants={fadeUp} className="mb-14">
            <SectionLabel index={data.index} label={data.label} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-4xl text-balance text-[2rem] font-medium leading-[1.15] tracking-[-0.05em] text-white sm:text-[2.7rem] md:text-[3.8rem] lg:text-[4.8rem]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {data.headline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-sm leading-7 text-white/46 md:text-[15px]"
          >
            {data.supporting}
          </motion.p>
        </Container>
      </motion.div>
    </section>
  );
}
