"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminShell from "@/components/admin/AdminShell";
import {
  Save,
  Loader2,
  Phone,
  Mail,
  Clock,
  MapPin,
  Type,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface BusinessContent {
  name: string;
  shortName: string;
  phone: string[];
  email: string;
  hours: string;
  hoursShort: string;
  yearsInBusiness: string;
  serviceAreasShort: string;
  address: string;
}

interface HeroContent {
  headline: string;
  headlineAccent: string;
  subheadline: string;
  badge: string;
}

interface AboutContent {
  title: string;
  paragraphs: string[];
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [business, setBusiness] = useState<BusinessContent | null>(null);
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/content");
      const data = await res.json();
      if (data.business) setBusiness(data.business);
      if (data.hero) setHero(data.hero);
      if (data.about) setAbout(data.about);
      setLoading(false);
    }
    load();
  }, []);

  const saveSection = async (key: string, value: unknown) => {
    setSaving(key);
    setSaved(null);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(key);
      setTimeout(() => setSaved(null), 3000);
    } catch {
      setError(key);
      setTimeout(() => setError(null), 3000);
    }
    setSaving(null);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red transition-colors placeholder:text-gray-600";

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-brand-red" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6 lg:p-10 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Site Content
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Edit your website text and contact information. Changes go live immediately.
          </p>
        </div>

        {/* Business Info */}
        {business && (
          <section className="bg-charcoal border border-white/5 p-6 lg:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Phone size={20} className="text-brand-red" />
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Business Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Business Name</label>
                <input value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Phone 1</label>
                  <input value={business.phone[0]} onChange={(e) => setBusiness({ ...business, phone: [e.target.value, business.phone[1]] })} className={inputClass} />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Phone 2</label>
                  <input value={business.phone[1]} onChange={(e) => setBusiness({ ...business, phone: [business.phone[0], e.target.value] })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Email</label>
                <input value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Business Hours</label>
                  <input value={business.hours} onChange={(e) => setBusiness({ ...business, hours: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Hours (Short)</label>
                  <input value={business.hoursShort} onChange={(e) => setBusiness({ ...business, hoursShort: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Years in Business</label>
                <input value={business.yearsInBusiness} onChange={(e) => setBusiness({ ...business, yearsInBusiness: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Service Areas</label>
                <input value={business.serviceAreasShort} onChange={(e) => setBusiness({ ...business, serviceAreasShort: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => saveSection("business", business)} disabled={saving === "business"} className="btn-primary !py-3 !text-xs disabled:opacity-50">
                {saving === "business" ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save Business Info</>}
              </button>
              {saved === "business" && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
              {error === "business" && <span className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14} /> Error saving</span>}
            </div>
          </section>
        )}

        {/* Hero Section */}
        {hero && (
          <section className="bg-charcoal border border-white/5 p-6 lg:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Type size={20} className="text-brand-red" />
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Hero Section</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Badge Text</label>
                <input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Headline</label>
                <input value={hero.headline} onChange={(e) => setHero({ ...hero, headline: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Accent Word (colored differently)</label>
                <input value={hero.headlineAccent} onChange={(e) => setHero({ ...hero, headlineAccent: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Subheadline</label>
                <textarea value={hero.subheadline} onChange={(e) => setHero({ ...hero, subheadline: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => saveSection("hero", hero)} disabled={saving === "hero"} className="btn-primary !py-3 !text-xs disabled:opacity-50">
                {saving === "hero" ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save Hero</>}
              </button>
              {saved === "hero" && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
              {error === "hero" && <span className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14} /> Error saving</span>}
            </div>
          </section>
        )}

        {/* About Section */}
        {about && (
          <section className="bg-charcoal border border-white/5 p-6 lg:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={20} className="text-brand-red" />
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>About Section</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Title</label>
                <input value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} className={inputClass} />
              </div>
              {about.paragraphs.map((p, i) => (
                <div key={i}>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Paragraph {i + 1}</label>
                  <textarea
                    value={p}
                    onChange={(e) => {
                      const updated = [...about.paragraphs];
                      updated[i] = e.target.value;
                      setAbout({ ...about, paragraphs: updated });
                    }}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => saveSection("about", about)} disabled={saving === "about"} className="btn-primary !py-3 !text-xs disabled:opacity-50">
                {saving === "about" ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save About</>}
              </button>
              {saved === "about" && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
              {error === "about" && <span className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14} /> Error saving</span>}
            </div>
          </section>
        )}
      </div>
    </AdminShell>
  );
}