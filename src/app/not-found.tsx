"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-charcoal noise-overlay relative">
      <div className="relative z-10 text-center px-6">
        <motion.div initial="hidden" animate="visible">
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-brand-red text-[8rem] sm:text-[12rem] font-bold leading-none opacity-20"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            custom={0.1}
            className="text-3xl sm:text-4xl font-bold text-white -mt-8 mb-4"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="text-gray-400 text-lg mb-10 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </motion.p>
          <motion.div variants={fadeInUp} custom={0.3}>
            <Link href="/" className="btn-primary">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
