"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_TYPES, BUSINESS } from "@/lib/constants";
import { Send, CheckCircle, AlertCircle, Loader2, Hash, Copy, Check } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  _honeypot: string;
}

const initial: FormData = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
  _honeypot: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [trackingId, setTrackingId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s()+-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.projectType) e.projectType = "Select a project type";
    if (!form.message.trim()) e.message = "Tell us about your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (form._honeypot) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType: form.projectType,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setTrackingId(data.tracking_id || "");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  const copyTrackingId = async () => {
    if (!trackingId) return;
    await navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-white/5 border ${
      errors[field] ? "border-red-400" : "border-white/10 focus:border-brand-red"
    } text-white px-5 py-4 text-sm transition-colors placeholder:text-gray-500`;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 px-6"
        >
          <CheckCircle size={56} className="text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Message Sent Successfully
          </h3>
          <p className="text-gray-400 mb-6" style={{ fontFamily: "var(--font-body)" }}>
            Thank you for reaching out. We&apos;ll get back to you within one business day.
          </p>

          {trackingId && (
            <div className="bg-white/5 border border-white/10 p-5 mb-6 inline-block">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Your Tracking ID
              </p>
              <div className="flex items-center gap-3">
                <Hash size={18} className="text-brand-red" />
                <span className="text-white text-2xl font-mono font-bold tracking-widest">{trackingId}</span>
                <button
                  onClick={copyTrackingId}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  title="Copy tracking ID"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: "var(--font-body)" }}>
                Save this ID to{" "}
                <Link href="/track" className="text-brand-red hover:underline">
                  track your request
                </Link>
              </p>
            </div>
          )}

          <div>
            <button
              onClick={() => { setStatus("idle"); setTrackingId(""); }}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <input
            type="text"
            name="website"
            value={form._honeypot}
            onChange={(e) => setForm({ ...form, _honeypot: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 h-0 w-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                className={inputClass("name")}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: undefined }); }}
                className={inputClass("phone")}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <select
              value={form.projectType}
              onChange={(e) => { setForm({ ...form, projectType: e.target.value }); setErrors({ ...errors, projectType: undefined }); }}
              className={`${inputClass("projectType")} ${!form.projectType ? "text-gray-500" : ""}`}
            >
              <option value="">Select Project Type *</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-charcoal text-white">
                  {t}
                </option>
              ))}
            </select>
            {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>}
          </div>

          <div>
            <textarea
              placeholder="Tell us about your project *"
              rows={5}
              value={form.message}
              onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
              className={`${inputClass("message")} resize-none`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm p-4 bg-red-400/10 border border-red-400/20">
              <AlertCircle size={16} />
              Something went wrong. Please call us at {BUSINESS.phone[0]} or try again.
            </div>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-brand-red"
            />
            <span className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              By submitting this form, I agree to the{" "}
              <a href="/privacy" target="_blank" className="text-brand-red hover:underline">Privacy Policy</a>{" "}
              and{" "}
              <a href="/terms" target="_blank" className="text-brand-red hover:underline">Terms of Use</a>.
              Submitted information is used only for responding to my inquiry and will be removed when no longer necessary.
            </span>
          </label>

          <button
            type="submit"
            disabled={status === "loading" || !agreed}
            className="btn-primary w-full justify-center !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          <p className="text-gray-500 text-xs text-center" style={{ fontFamily: "var(--font-body)" }}>
            We respond to all inquiries within one business day.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
