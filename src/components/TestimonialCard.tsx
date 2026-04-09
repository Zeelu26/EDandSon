"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, location, text, rating }: TestimonialCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="premium-card bg-white border border-gray-100 p-8 lg:p-10 relative"
    >
      <Quote size={32} className="text-brand-red/10 absolute top-6 right-6" />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-gold text-gold" />
        ))}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10" style={{ fontFamily: "var(--font-body)" }}>
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {name[0]}
        </div>
        <div>
          <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{name}</p>
          <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>{location}</p>
        </div>
      </div>
    </motion.div>
  );
}
