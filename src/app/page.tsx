"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, staggerItem, slideInLeft, slideInRight } from "@/lib/motion";
import { BUSINESS, SERVICES, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import GalleryGrid from "@/components/GalleryGrid";
import CTABlock from "@/components/CTABlock";
import ContactForm from "@/components/ContactForm";
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  Award,
  Users,
  Hammer,
  CheckCircle,
  Star,
} from "lucide-react";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden noise-overlay">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.04]" style={{
          background: "radial-gradient(circle, #9B1B1B 0%, transparent 70%)",
        }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.03]" style={{
          background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs font-semibold tracking-[0.15em] uppercase text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                <span className="w-2 h-2 bg-brand-red rounded-full" />
                {BUSINESS.yearsInBusiness} Years of Excellence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={0.15}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.05]"
            >
              Crafting{" "}
              <span className="gradient-text">Exceptional</span>
              <br />
              Living Spaces
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.3}
              className="text-gray-400 text-lg lg:text-xl max-w-lg leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Premium home remodeling in New Jersey. From kitchens and bathrooms to complete renovations—delivered with precision, integrity, and an uncompromising eye for detail.
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.4} className="flex flex-col sm:flex-row items-start gap-4 mb-14">
              <Link href="/contact" className="btn-primary">
                Request a Free Quote
                <ArrowRight size={16} />
              </Link>
              <a href={`tel:${BUSINESS.phone[0].replace(/-/g, "")}`} className="btn-outline">
                <Phone size={16} />
                {BUSINESS.phone[0]}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={fadeInUp} custom={0.55} className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
                <span className="text-gray-400 text-xs ml-2" style={{ fontFamily: "var(--font-body)" }}>5.0 Rating</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>Licensed & Insured</span>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>Free Estimates</span>
            </motion.div>
          </motion.div>

          {/* Right — feature image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] image-placeholder relative overflow-hidden">
              <span className="text-white/10 text-sm">Hero Image</span>
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-red/20 -z-10" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -left-8 bottom-12 bg-white p-5 shadow-2xl">
              <p className="text-3xl font-bold text-charcoal" style={{ fontFamily: "var(--font-display)" }}>10+</p>
              <p className="text-gray-500 text-xs font-medium tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>Years in Business</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ─── Trust Indicators ─── */
function TrustBar() {
  const items = [
    { icon: Award, label: "10+ Years Experience", desc: "Proven track record" },
    { icon: MapPin, label: "Central New Jersey", desc: "Livingston & Lebanon areas" },
    { icon: Shield, label: "Licensed & Insured", desc: "Full protection" },
    { icon: Hammer, label: "Expert Craftsmanship", desc: "Premium quality" },
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {items.map(({ icon: Icon, label, desc }) => (
            <motion.div key={label} variants={staggerItem} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-cream flex items-center justify-center">
                <Icon size={24} className="text-brand-red" />
              </div>
              <h3 className="text-charcoal font-bold text-base mb-1" style={{ fontFamily: "var(--font-display)" }}>{label}</h3>
              <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Featured Services ─── */
function FeaturedServices() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Our Expertise"
          description="From full kitchen transformations to meticulous tile work, every project receives the same dedication to quality and precision."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.slice(0, 4).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-primary !bg-charcoal hover:!bg-charcoal-light">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  const reasons = [
    { title: "Meticulous Attention to Detail", desc: "Every cut, every joint, every finish is held to the highest standard. We don't cut corners—we craft them." },
    { title: "Transparent Communication", desc: "You'll always know where your project stands. Clear timelines, honest pricing, and consistent updates from start to finish." },
    { title: "Quality Materials, Expert Install", desc: "We source premium materials and pair them with installation expertise that ensures lasting beauty and performance." },
    { title: "On-Time, On-Budget Delivery", desc: "We respect your time and investment. Our disciplined process keeps your project moving efficiently without sacrificing quality." },
    { title: "Personalized Design Guidance", desc: "Your vision drives every decision. We help refine your ideas into practical, stunning results tailored to your home." },
    { title: "Full-Service Remodeling", desc: "Kitchens, bathrooms, additions, tile, painting, patios, and more—one trusted team for all your renovation needs." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative noise-overlay overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.04]" style={{
        background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Why Ed & Son"
          title="The Difference Is in the Details"
          description="We don't just renovate homes. We create spaces that elevate how you live—with craftsmanship that stands the test of time."
          light
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map(({ title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
            >
              <CheckCircle size={20} className="text-brand-red mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Gallery Preview ─── */
function GalleryPreview() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Recent Projects"
          description="A curated selection of transformations that showcase our range, quality, and commitment to excellence."
        />
        <GalleryGrid limit={6} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <Link href="/projects" className="btn-primary !bg-charcoal hover:!bg-charcoal-light">
            View Full Gallery
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Client Testimonials"
          title="What Our Clients Say"
          description="Real feedback from homeowners who trusted us with their renovations."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact Preview ─── */
function ContactPreview() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal relative noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.span variants={fadeInUp} custom={0} className="text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ fontFamily: "var(--font-body)" }}>
              Get In Touch
            </motion.span>
            <motion.h2 variants={fadeInUp} custom={0.1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something Beautiful
            </motion.h2>
            <motion.div variants={fadeInUp} custom={0.15} className="section-divider mb-6" />
            <motion.p variants={fadeInUp} custom={0.2} className="text-gray-400 text-lg leading-relaxed mb-10" style={{ fontFamily: "var(--font-body)" }}>
              Whether you have a clear vision or need help refining your ideas, we&apos;re here to make it happen. Reach out for a free consultation and estimate.
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.3} className="space-y-5">
              {BUSINESS.phone.map((p) => (
                <a key={p} href={`tel:${p.replace(/-/g, "")}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <Phone size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="text-lg font-semibold">{p}</p>
                  </div>
                </a>
              ))}
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group" style={{ fontFamily: "var(--font-body)" }}>
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                  <Mail size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="text-lg font-semibold">{BUSINESS.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-gray-300" style={{ fontFamily: "var(--font-body)" }}>
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <Clock size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Hours</p>
                  <p className="text-lg font-semibold">{BUSINESS.hoursShort}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            custom={0.2}
            className="bg-charcoal-light border border-white/5 p-8 lg:p-10"
          >
            <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Request a Free Quote</h3>
            <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: "var(--font-body)" }}>Fill out the form below and we&apos;ll get back to you within one business day.</p>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedServices />
      <WhyChooseUs />
      <GalleryPreview />
      <TestimonialsSection />
      <CTABlock />
      <ContactPreview />
    </>
  );
}
