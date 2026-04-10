"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Loader2, Hash, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface TrackingResult {
  tracking_id: string;
  project_type: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; icon: typeof Clock; color: string; description: string }> = {
  new: { label: "Received", icon: AlertCircle, color: "text-brand-red", description: "We've received your request and will review it shortly." },
  contacted: { label: "Contacted", icon: Clock, color: "text-yellow-500", description: "We've reached out to you. Please check your phone or email." },
  in_progress: { label: "In Progress", icon: Clock, color: "text-blue-500", description: "Your project is being planned. We'll follow up with details soon." },
  quoted: { label: "Quoted", icon: CheckCircle, color: "text-green-500", description: "We've sent you a quote. Please review and let us know if you have questions." },
  closed: { label: "Closed", icon: CheckCircle, color: "text-gray-500", description: "This request has been completed. Thank you for choosing Ed & Son!" },
  spam: { label: "Not Found", icon: AlertCircle, color: "text-gray-500", description: "" },
};

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    const supabase = createClient();
    const { data } = await supabase
      .from("quote_requests")
      .select("tracking_id, project_type, status, created_at")
      .eq("tracking_id", trackingId.trim().toUpperCase())
      .neq("status", "spam")
      .single();

    if (data) {
      setResult(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const statusInfo = result ? statusLabels[result.status] || statusLabels.new : null;

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <Hash size={32} className="text-brand-red mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Track Your Quote
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Enter the tracking ID you received to check the status of your quote request.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="e.g. ED-2K7X"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            maxLength={8}
            className="flex-1 bg-white/5 border border-white/10 text-white px-5 py-4 text-sm uppercase tracking-wider font-mono focus:border-brand-red transition-colors placeholder:text-gray-600 text-center text-lg"
          />
          <button
            type="submit"
            disabled={loading || !trackingId.trim()}
            className="btn-primary !px-6 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </button>
        </form>

        {/* Result */}
        {result && statusInfo && (
          <div className="bg-charcoal-light border border-white/5 p-8 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${statusInfo.color}`}>
              <statusInfo.icon size={36} />
            </div>
            <p className="text-gray-500 text-xs font-mono mb-2">{result.tracking_id}</p>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {statusInfo.label}
            </h2>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "var(--font-body)" }}>
              {statusInfo.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-left border-t border-white/5 pt-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Project</p>
                <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{result.project_type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Submitted</p>
                <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{new Date(result.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {notFound && (
          <div className="bg-charcoal-light border border-white/5 p-8 text-center">
            <AlertCircle size={36} className="text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Not Found
            </h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              No quote found with that tracking ID. Double-check the ID or contact us directly.
            </p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/contact" className="text-brand-red text-sm font-semibold hover:underline" style={{ fontFamily: "var(--font-body)" }}>
            Need help? Contact us directly
          </Link>
        </div>
      </div>
    </div>
  );
}
