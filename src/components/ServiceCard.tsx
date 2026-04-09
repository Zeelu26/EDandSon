"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/lib/constants";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      variants={staggerItem}
      className="group premium-card bg-white border border-gray-100 overflow-hidden"
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden image-placeholder">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-charcoal-light transition-transform duration-700 group-hover:scale-110" />
        <span className="relative z-0 text-white/10 text-sm">{service.shortTitle}</span>
        {/* Number overlay */}
        <span
          className="absolute top-4 left-5 z-20 text-white/20 text-6xl font-bold leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="absolute bottom-4 left-5 right-5 z-20 text-white text-xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {service.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
          {service.description}
        </p>
        <ul className="space-y-2 mb-6">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold tracking-wide uppercase group/link"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Get a Quote
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
