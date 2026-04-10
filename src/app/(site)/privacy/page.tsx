"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 bg-charcoal noise-overlay overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible">
            <motion.h1 variants={fadeInUp} custom={0.1} className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Privacy Policy
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
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Introduction</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ed & Son Home Improvements (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or submit inquiries through our contact and quote request forms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Information We Collect</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">When you submit a quote request or contact form, we collect the following information:</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your name, phone number, email address, project type, and any details you include in your message. We do not collect financial information, social security numbers, or any sensitive personal data through our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>How We Use Your Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your information is used solely for the purpose of responding to your inquiry, providing project estimates, scheduling consultations, and communicating about our services. We may send you a confirmation email when you submit a quote request. We do not use your information for marketing purposes beyond responding to your specific inquiry.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Data Storage and Security</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your submitted information is stored securely using industry-standard encryption and hosted on secure cloud infrastructure. We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. Access to your data is restricted to authorized personnel only.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Data Retention</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purpose for which it was collected, including responding to your inquiry and providing requested services. When your information is no longer needed for business purposes, it will be securely deleted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Information Sharing</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We do not sell, trade, rent, or share your personal information with third parties for marketing purposes. We may share your information only with trusted service providers who assist us in operating our website and conducting our business, and only to the extent necessary for them to perform those services. These providers are obligated to keep your information confidential.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our website uses essential cookies required for basic functionality such as authentication. We do not use tracking cookies, advertising cookies, or third-party analytics that collect personal data. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Your Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              You have the right to request access to, correction of, or deletion of your personal information at any time. To exercise these rights, please contact us using the information below. We will respond to your request within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4" style={{ fontFamily: "var(--font-display)" }}>Contact Us</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
            </p>
            <div className="mt-3 p-4 bg-cream text-sm text-charcoal">
              <p className="font-semibold">Ed & Son Home Improvements</p>
              <p>Email: ewcpereira@outlook.com</p>
              <p>Phone: 908-267-7613</p>
              <p>Serving Livingston, NJ & Lebanon, NJ and Surrounding Areas</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}