"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import GalleryGrid from "@/components/GalleryGrid";
import CTABlock from "@/components/CTABlock";

export default function ProjectsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-36 pb-20 bg-charcoal noise-overlay overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04]" style={{
          background: "radial-gradient(circle, #9B1B1B 0%, transparent 70%)",
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible">
            <motion.span variants={fadeInUp} custom={0} className="text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body)" }}>
              Portfolio
            </motion.span>
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Projects
            </motion.h1>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Browse a selection of completed renovations and transformations across Central New Jersey. Each project reflects our commitment to quality, design, and lasting value.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>

      <CTABlock
        headline="Have a Project in Mind?"
        description="We'd love to see your space and discuss how we can bring your vision to life. Contact us for a complimentary on-site consultation."
      />
    </>
  );
}
