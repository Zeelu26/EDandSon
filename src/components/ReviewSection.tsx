"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Star, Send, CheckCircle, Loader2, MessageSquare, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  created_at: string;
}

function StarRating({ rating, onRate, interactive }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => interactive && onRate?.(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
          disabled={!interactive}
        >
          <Star
            size={interactive ? 28 : 16}
            className={`${
              i <= (hover || rating) ? "fill-gold text-gold" : "text-gray-600"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-100 p-8 premium-card"
    >
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={review.rating} />
        <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {review.name[0]?.toUpperCase()}
        </div>
        <div>
          <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{review.name}</p>
          {review.location && (
            <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>{review.location}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ReviewForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, rating, text }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setLocation("");
      setRating(0);
      setText("");
      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 text-charcoal px-4 py-3 text-sm focus:border-brand-red transition-colors placeholder:text-gray-400";

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-charcoal mb-2" style={{ fontFamily: "var(--font-display)" }}>Thank You!</h3>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
          Your review has been submitted and will appear once approved.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-brand-red text-sm font-semibold hover:underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Your Rating *</label>
        <StarRating rating={rating} onRate={setRating} interactive />
        {rating === 0 && status === "error" && (
          <p className="text-red-500 text-xs mt-1">Please select a rating</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className={inputClass}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location (e.g. Livingston, NJ)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={100}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <textarea
          placeholder="Tell us about your experience *"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          maxLength={2000}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading" || !name.trim() || !text.trim() || rating === 0}
        className="btn-primary !bg-charcoal hover:!bg-charcoal-light disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /> Submit Review</>}
      </button>
    </form>
  );
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Client Reviews"
          title="What Our Clients Say"
          description={`${avgRating} average rating from ${reviews.length || "our"} verified client${reviews.length !== 1 ? "s" : ""}.`}
        />

        {/* Review Form Toggle */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary !bg-charcoal hover:!bg-charcoal-light"
          >
            {showForm ? <><X size={14} /> Cancel</> : <><MessageSquare size={14} /> Leave a Review</>}
          </button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="max-w-2xl mx-auto bg-white border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-charcoal mb-2" style={{ fontFamily: "var(--font-display)" }}>Share Your Experience</h3>
                <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "var(--font-body)" }}>Your review will be visible after approval.</p>
                <ReviewForm onSuccess={() => { loadReviews(); setShowForm(false); }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-brand-red" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}