"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto bg-charcoal border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-gray-400 text-sm flex-1" style={{ fontFamily: "var(--font-body)" }}>
          This website uses essential cookies for basic functionality. We do not use tracking or advertising cookies. By continuing to use this site, you consent to our{" "}
          <Link href="/privacy" className="text-brand-red hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="btn-primary !py-2.5 !px-5 !text-xs"
          >
            Accept
          </button>
          <button
            onClick={accept}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}