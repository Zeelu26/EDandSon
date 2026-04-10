"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";

export default function ServicesPage() {
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
              Our Services
            </motion.span>
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              What We Build
            </motion.h1>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              From complete kitchen overhauls to precision tile installations, Ed & Son delivers full-service home improvement with the quality and care your home deserves.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="How We Work"
            title="Our Process"
            description="A straightforward, transparent approach that keeps you informed and your project on track from day one."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { step: "01", title: "Consultation", desc: "We visit your home, listen to your goals, and discuss possibilities and budget." },
              { step: "02", title: "Planning & Design", desc: "We develop a clear scope of work, select materials, and finalize your project timeline." },
              { step: "03", title: "Expert Execution", desc: "Our skilled team brings the plan to life with precision, cleanliness, and quality at every step." },
              { step: "04", title: "Final Walkthrough", desc: "We review every detail together to ensure complete satisfaction before we call it done." },
            ].map(({ step, title, desc }) => (
              <motion.div key={step} variants={fadeInUp} className="text-center relative">
                <span className="text-5xl font-bold text-brand-red/10 mb-4 block" style={{ fontFamily: "var(--font-display)" }}>{step}</span>
                <h3 className="text-charcoal text-lg font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABlock variant="red" />
    </>
  );
}
