"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-charcoal noise-overlay overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible">
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Terms of Use
            </motion.h1>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Last updated: April 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-10" style={{ fontFamily: "var(--font-body)" }}>
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Acceptance of Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              By accessing and using the Ed & Son Home Improvements website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Use of Website</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This website is provided for informational purposes and to facilitate communication between you and Ed & Son Home Improvements. You agree to use this website only for lawful purposes and in a manner that does not infringe upon or restrict the use of this website by others.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Quote Requests</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Submitting a quote request through our website does not constitute a binding agreement or contract. All quotes provided are estimates based on the information you provide and are subject to change upon on-site evaluation. Final pricing, scope of work, and timelines will be confirmed in a written agreement before any work begins.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Intellectual Property</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All content on this website, including text, images, logos, photographs, and design elements, is the property of Ed & Son Home Improvements and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content from this website without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Project Images</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Photographs displayed on this website represent actual projects completed by Ed & Son Home Improvements. Results may vary based on individual project specifications, materials selected, and site conditions. Images are intended to showcase our craftsmanship and should not be considered a guarantee of identical results.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Limitation of Liability</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ed & Son Home Improvements makes every effort to ensure the information on this website is accurate and up to date. However, we make no warranties or representations about the completeness, reliability, or accuracy of the content. Your use of this website is at your own risk. We shall not be liable for any damages arising from the use of or inability to use this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>External Links</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of use of any external websites. Accessing external links is at your own discretion and risk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Changes to Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Governing Law</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              These Terms of Use are governed by and construed in accordance with the laws of the State of New Jersey. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New Jersey.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Contact</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              For questions regarding these Terms of Use, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-cream text-sm text-charcoal">
              <p className="font-semibold">Ed & Son Home Improvements</p>
              <p>Email: ewcpereira@outlook.com</p>
              <p>Phone: 908-267-7613</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}