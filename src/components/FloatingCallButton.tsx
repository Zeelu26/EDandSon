"use client";

import { BUSINESS } from "@/lib/constants";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingCallButton() {
  return (
    <motion.a
      href={`tel:${BUSINESS.phone[0].replace(/-/g, "")}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 bg-brand-red rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(155,27,27,0.5)] active:scale-95 transition-transform"
      aria-label="Call Ed & Son"
    >
      <Phone size={22} className="text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-charcoal animate-pulse" />
    </motion.a>
  );
}
