"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from "@/lib/motion";
import { BUSINESS, SERVICES, PROJECTS, TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABlock from "@/components/CTABlock";
import ReviewSection from "@/components/ReviewSection";
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

/* ── Types for Supabase content ── */
interface SiteContent {
  hero?: {
    headline: string;
    headlineAccent: string;
    subheadline: string;
    badge: string;
  };
  business?: {
    name: string;
    shortName: string;
    phone: string[];
    email: string;
    hours: string;
    hoursShort: string;
    yearsInBusiness: string;
    serviceAreasShort: string;
    address: string;
  };
}

/* ─────────────────────────────────────────────
   Auto-Shuffling Gallery Box
   ───────────────────────────────────────────── */
function ShuffleBox({ images, interval, className }: { images: typeof PROJECTS; interval: number; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const current = images[index];

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <p className="text-brand-red text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ fontFamily: "var(--font-body)" }}>
              {current.category}
            </p>
            <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {current.title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Hero ─── */
function Hero({ content }: { content: SiteContent | null }) {
  const hero = content?.hero;
  const biz = content?.business;
  const phone1 = biz?.phone?.[0] || BUSINESS.phone[0];
  const badge = hero?.badge || `${BUSINESS.yearsInBusiness} Years of Excellence`;
  const subheadline = hero?.subheadline || "Premium home remodeling in New Jersey. From kitchens and bathrooms to complete renovations\u2014delivered with precision, integrity, and an uncompromising eye for detail.";

  const renderHeadline = () => {
    const headline = hero?.headline || "Crafting Exceptional Living Spaces";
    const accent = hero?.headlineAccent || "Exceptional";
    const idx = headline.indexOf(accent);
    if (idx === -1) return <>{headline}</>;
    const before = headline.slice(0, idx);
    const after = headline.slice(idx + accent.length);
    return (
      <>
        {before}
        <span className="gradient-text">{accent}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative min-h-[700px] h-screen max-h-[900px] flex items-center bg-charcoal overflow-hidden noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%, black 100%)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-van.jpeg"
            alt="Ed & Son Home Improvements work van"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, transparent 0%, rgba(26,26,26,0.3) 50%, rgba(26,26,26,0.15) 100%)",
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-6" style={{
          background: "linear-gradient(to top, #ffffff, transparent)",
        }} />
        <div className="absolute top-0 left-0 right-0 h-24" style={{
          background: "linear-gradient(to bottom, rgba(26,26,26,0.4), transparent)",
        }} />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-[0.15em] uppercase text-gray-300" style={{ fontFamily: "var(--font-body)" }}>
                <span className="w-2 h-2 bg-brand-red rounded-full" />
                {badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={0.15}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.05]"
            >
              {renderHeadline()}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.3}
              className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {subheadline}
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.4} className="flex flex-col sm:flex-row items-start gap-4 mb-14">
              <Link href="/contact" className="btn-primary">
                Request a Free Quote
                <ArrowRight size={16} />
              </Link>
              <a href={`tel:${phone1.replace(/-/g, "")}`} className="btn-outline">
                <Phone size={16} />
                {phone1}
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} custom={0.55} className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
                <span className="text-gray-300 text-xs ml-2" style={{ fontFamily: "var(--font-body)" }}>5.0 Rating</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <span className="text-gray-300 text-xs" style={{ fontFamily: "var(--font-body)" }}>Licensed & Insured</span>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <span className="text-gray-300 text-xs" style={{ fontFamily: "var(--font-body)" }}>Free Estimates</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
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
    { title: "Meticulous Attention to Detail", desc: "Every cut, every joint, every finish is held to the highest standard. We don't cut corners\u2014we craft them." },
    { title: "Transparent Communication", desc: "You'll always know where your project stands. Clear timelines, honest pricing, and consistent updates from start to finish." },
    { title: "Quality Materials, Expert Install", desc: "We source premium materials and pair them with installation expertise that ensures lasting beauty and performance." },
    { title: "On-Time, On-Budget Delivery", desc: "We respect your time and investment. Our disciplined process keeps your project moving efficiently without sacrificing quality." },
    { title: "Personalized Design Guidance", desc: "Your vision drives every decision. We help refine your ideas into practical, stunning results tailored to your home." },
    { title: "Full-Service Remodeling", desc: "Kitchens, bathrooms, additions, tile, painting, patios, and more\u2014one trusted team for all your renovation needs." },
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
          description="We don't just renovate homes. We create spaces that elevate how you live\u2014with craftsmanship that stands the test of time."
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

/* ─── Gallery Preview — reads from Supabase ─── */
function GalleryPreview() {
  const [projects, setProjects] = useState<Array<{ id: string; title: string; category: string; image: string }>>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(
            data
              .filter((p: any) => p.visible)
              .map((p: any) => ({ id: p.id, title: p.title, category: p.category, image: p.image_url }))
          );
        } else {
          setProjects(PROJECTS.map((p) => ({ id: p.id, title: p.title, category: p.category, image: p.image })));
        }
      } catch {
        setProjects(PROJECTS.map((p) => ({ id: p.id, title: p.title, category: p.category, image: p.image })));
      }
    }
    load();
  }, []);

  if (projects.length === 0) return null;

  const group1 = projects.filter((_, i) => i % 2 === 0);
  const group2 = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Recent Projects"
          description="A curated selection of transformations that showcase our range, quality, and commitment to excellence."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px] lg:auto-rows-[280px]">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div key={project.id} variants={staggerItem} className="relative overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <p className="text-brand-red text-[10px] font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ fontFamily: "var(--font-body)" }}>
                    {project.category}
                  </p>
                  <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
function ContactPreview({ content }: { content: SiteContent | null }) {
  const biz = content?.business;
  const phones = biz?.phone || BUSINESS.phone;
  const email = biz?.email || BUSINESS.email;
  const hoursShort = biz?.hoursShort || BUSINESS.hoursShort;

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
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
              {phones.map((p: string) => (
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
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group" style={{ fontFamily: "var(--font-body)" }}>
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                  <Mail size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="text-lg font-semibold">{email}</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-gray-300" style={{ fontFamily: "var(--font-body)" }}>
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <Clock size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Hours</p>
                  <p className="text-lg font-semibold">{hoursShort}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

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
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero content={content} />
      <TrustBar />
      <FeaturedServices />
      <WhyChooseUs />
      <GalleryPreview />
      <ReviewSection />
      <CTABlock />
      <ContactPreview content={content} />
    </>
  );
}
