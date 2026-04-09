"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

interface CTABlockProps {
  headline?: string;
  description?: string;
  variant?: "dark" | "red";
}

export default function CTABlock({
  headline = "Ready to Transform Your Home?",
  description = "Schedule a free consultation and discover what's possible. From concept to completion, we'll guide you through every step of your renovation.",
  variant = "dark",
}: CTABlockProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative py-24 lg:py-32 overflow-hidden ${
        isDark ? "bg-charcoal" : "bg-brand-red"
      }`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, #9B1B1B 0%, transparent 70%)"
              : "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            variants={fadeInUp}
            custom={0}
            className={`inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase ${
              isDark ? "text-brand-red" : "text-white/70"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Start Your Project
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            {headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className={`text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
              isDark ? "text-gray-400" : "text-white/80"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={0.3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className={isDark ? "btn-primary" : "btn-primary !bg-white !text-brand-red hover:!bg-gray-100"}>
              Request a Free Quote
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${BUSINESS.phone[0].replace(/-/g, "")}`}
              className="btn-outline"
            >
              <Phone size={16} />
              {BUSINESS.phone[0]}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
