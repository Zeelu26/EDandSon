"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { BUSINESS } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-charcoal font-semibold text-base pr-4" style={{ fontFamily: "var(--font-display)" }}>{q}</span>
        <ChevronDown size={18} className={`text-brand-red shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  const faqs = [
    { q: "Do you offer free estimates?", a: "Yes. We provide free on-site consultations and detailed estimates for every project. There's no obligation—we want you to feel confident before moving forward." },
    { q: "How long does a typical kitchen remodel take?", a: "Most kitchen remodels take between 4–8 weeks depending on scope. We'll provide a clear timeline during the planning phase and keep you updated throughout." },
    { q: "Do you handle permits?", a: "Absolutely. We handle all necessary permits and inspections so you don't have to worry about the paperwork side of your renovation." },
    { q: "Are you licensed and insured?", a: "Yes. Ed & Son Home Improvements is fully licensed and insured. We carry comprehensive liability and workers' compensation coverage for your protection." },
    { q: "What areas do you serve?", a: "We serve Livingston, Lebanon, and surrounding areas across Morris, Somerset, Union, and Hunterdon counties in Central and Northern New Jersey." },
    { q: "Can you work with my existing design plans?", a: "Of course. Whether you have architectural drawings, Pinterest boards, or just a general idea—we'll work with whatever you have and help refine it into reality." },
  ];

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
              Contact Us
            </motion.span>
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Start Your Project Today
            </motion.h1>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Ready to transform your space? Get in touch for a free consultation and estimate. We respond to all inquiries within one business day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info Column */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeInUp} custom={0} className="text-3xl font-bold text-charcoal mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Get In Touch
              </motion.h2>
              <motion.div variants={fadeInUp} custom={0.05} className="section-divider mb-8" />

              <motion.div variants={fadeInUp} custom={0.1} className="space-y-6 mb-12">
                {BUSINESS.phone.map((p) => (
                  <a key={p} href={`tel:${p.replace(/-/g, "")}`} className="flex items-center gap-4 group" style={{ fontFamily: "var(--font-body)" }}>
                    <div className="w-12 h-12 bg-cream flex items-center justify-center group-hover:bg-brand-red/10 transition-colors">
                      <Phone size={18} className="text-brand-red" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Phone</p>
                      <p className="text-charcoal font-semibold text-lg">{p}</p>
                    </div>
                  </a>
                ))}
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 group" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="w-12 h-12 bg-cream flex items-center justify-center group-hover:bg-brand-red/10 transition-colors">
                    <Mail size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-charcoal font-semibold">{BUSINESS.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="w-12 h-12 bg-cream flex items-center justify-center">
                    <Clock size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Hours</p>
                    <p className="text-charcoal font-semibold">{BUSINESS.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="w-12 h-12 bg-cream flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Service Areas</p>
                    <p className="text-charcoal font-semibold">{BUSINESS.serviceAreasShort}</p>
                    <p className="text-gray-500 text-sm mt-1">Morris, Somerset, Union & Hunterdon Counties</p>
                  </div>
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div variants={fadeInUp} custom={0.3} className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-brand-red/30" />
                    <p>Map Embed Area</p>
                    <p className="text-xs text-gray-400 mt-1">Replace with Google Maps iframe</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={0.2}
            >
              <div className="bg-charcoal p-8 lg:p-12">
                <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Request a Free Quote
                </h3>
                <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: "var(--font-body)" }}>
                  Tell us about your project and we&apos;ll provide a detailed estimate.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} custom={0} className="text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body)" }}>
              FAQ
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mx-auto" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.2}
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
