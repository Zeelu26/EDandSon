"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, slideInLeft, slideInRight } from "@/lib/motion";
import { BUSINESS, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import CTABlock from "@/components/CTABlock";
import {
  Award,
  Shield,
  Users,
  Heart,
  Target,
  Handshake,
} from "lucide-react";

export default function AboutPage() {
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
              About Us
            </motion.span>
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Built on Trust,{" "}
              <span className="gradient-text">Driven by Craft</span>
            </motion.h1>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Over a decade of transforming homes across New Jersey with a family-first approach, honest workmanship, and a reputation earned one project at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="relative"
            >
              <div className="aspect-[4/5] image-placeholder">
                <span className="text-white/10 text-sm">Team Photo</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-red/15 -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fadeInUp} custom={0} className="text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body)" }}>
                Our Story
              </motion.span>
              <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                A Family Business With Professional Standards
              </motion.h2>
              <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
              <motion.div variants={fadeInUp} custom={0.2} className="space-y-5 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  Ed & Son Home Improvements was founded on a simple principle: every home deserves the same level of care and craftsmanship that we would bring to our own. Over the past decade, that principle has guided every project we&apos;ve taken on—from small bathroom updates to full-scale home additions.
                </p>
                <p>
                  As a family-owned business based in New Jersey, we take pride in building genuine relationships with our clients. When you hire Ed & Son, you&apos;re not getting a faceless contractor—you&apos;re getting a dedicated team that shows up every day with the same goal: to deliver results that exceed your expectations.
                </p>
                <p>
                  Our hands-on approach means that the people planning your project are the same people doing the work. There&apos;s no middle layer, no miscommunication—just direct, skilled craftsmanship applied with care, precision, and respect for your home.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-charcoal noise-overlay relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What Guides Our Work"
            light
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Target, title: "Precision", desc: "We measure twice, cut once, and inspect everything. Precision isn't a bonus—it's our baseline." },
              { icon: Handshake, title: "Integrity", desc: "Honest estimates, reliable timelines, and no surprises. Our word is our foundation." },
              { icon: Heart, title: "Passion", desc: "We genuinely love what we do. That passion shows in every tile we set, every wall we finish." },
              { icon: Users, title: "Family Values", desc: "As a family business, we treat every client like a neighbor. Your satisfaction is personal to us." },
              { icon: Award, title: "Excellence", desc: "Good enough isn't in our vocabulary. We pursue the highest quality in materials, technique, and results." },
              { icon: Shield, title: "Accountability", desc: "We stand behind every project. If something isn't right, we make it right—no questions asked." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-8 border border-white/5 bg-white/[0.02] group hover:bg-white/[0.05] transition-colors"
              >
                <Icon size={24} className="text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white text-lg font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10+", label: "Years in Business" },
              { number: "500+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "2", label: "Convenient Locations" },
            ].map(({ number, label }) => (
              <motion.div key={label} variants={staggerItem}>
                <p className="text-4xl lg:text-5xl font-bold text-brand-red mb-2" style={{ fontFamily: "var(--font-display)" }}>{number}</p>
                <p className="text-gray-500 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Client Testimonials"
            title="Trusted by Homeowners Across NJ"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTABlock variant="red" headline="Work With a Team That Cares" description="Experience the Ed & Son difference. Let's discuss your project and show you what thoughtful, skilled renovation looks like." />
    </>
  );
}
