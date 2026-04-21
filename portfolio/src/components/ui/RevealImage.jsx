import React from "react";
import { motion } from "framer-motion";
import { imageReveal } from "../../utils/animations";

export default function RevealImage({ src, alt, className = "", imageClassName = "", caption }) {
  return (
    <motion.figure
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={`group relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.02] ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-white/0 transition duration-700 group-hover:bg-white/[0.04]" />
      {caption ? (
        <figcaption className="mt-3 text-xs uppercase tracking-[0.3em] text-white/30">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
