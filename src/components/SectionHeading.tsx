"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  center = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {label && (
        <motion.span
          variants={fadeInUp}
          custom={0}
          className="inline-block mb-4 text-brand-red font-semibold text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        custom={0.1}
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div variants={fadeInUp} custom={0.15} className={`section-divider ${center ? "mx-auto" : ""} mb-6`} />
      {description && (
        <motion.p
          variants={fadeInUp}
          custom={0.2}
          className={`text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
