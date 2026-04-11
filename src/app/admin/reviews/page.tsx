"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Star, CheckCircle, XCircle, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  approved: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    const res = await fetch("/api/reviews?all=true");
    const data = await res.json();
    if (Array.isArray(data)) setReviews(data);
    setLoading(false);
  };

  useEffect(() => { loadReviews(); }, []);

  const toggleApproval = async (review: Review) => {
    await fetch("/api/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, approved: !review.approved }),
    });
    await loadReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadReviews();
  };

  return (
    <AdminShell>
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Reviews
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Approve, hide, or delete customer reviews. Only approved reviews appear on the website.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-red" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-charcoal border border-white/5">
            <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-charcoal border border-white/5 p-6 ${!review.approved ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={14} className={i <= review.rating ? "fill-gold text-gold" : "text-gray-600"} />
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        review.approved ? "bg-green-400/20 text-green-400" : "bg-yellow-400/20 text-yellow-400"
                      }`}>
                        {review.approved ? "Approved" : "Pending"}
                      </span>
                      <span className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-body)" }}>
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)" }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      {review.name}
                      {review.location && <span className="text-gray-500 font-normal"> — {review.location}</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleApproval(review)}
                      className={`p-2 transition-colors ${review.approved ? "text-green-400 hover:text-yellow-400" : "text-yellow-400 hover:text-green-400"}`}
                      title={review.approved ? "Hide review" : "Approve review"}
                    >
                      {review.approved ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600 text-xs mt-4" style={{ fontFamily: "var(--font-body)" }}>
          {reviews.length} review{reviews.length !== 1 ? "s" : ""} — {reviews.filter((r) => r.approved).length} approved
        </p>
      </div>
    </AdminShell>
  );
}