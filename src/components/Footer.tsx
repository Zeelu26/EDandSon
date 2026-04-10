"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SERVICES, NAV_LINKS } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white relative noise-overlay">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-red-light to-gold" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.jpeg"
                alt="Ed & Son Home Improvements"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Ed & Son</div>
                <div className="text-gray-500 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>Home Improvements</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Premium home remodeling and renovation services in Central and Northern New Jersey. Over a decade of transforming homes with expert craftsmanship.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-brand-red transition-colors text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-red transition-colors text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-brand-red hover:text-brand-red-light transition-colors text-sm font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              {BUSINESS.phone.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/-/g, "")}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group" style={{ fontFamily: "var(--font-body)" }}>
                    <Phone size={14} className="text-brand-red group-hover:scale-110 transition-transform" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group" style={{ fontFamily: "var(--font-body)" }}>
                  <Mail size={14} className="text-brand-red group-hover:scale-110 transition-transform" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <Clock size={14} className="text-brand-red" />
                {BUSINESS.hours}
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <MapPin size={14} className="text-brand-red mt-0.5 shrink-0" />
                {BUSINESS.serviceAreasShort}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-body)" }}>
            Proudly serving {BUSINESS.serviceAreasShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
