"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface Stats {
  total: number;
  new: number;
  contacted: number;
  in_progress: number;
  quoted: number;
  closed: number;
}

interface RecentQuote {
  id: string;
  tracking_id: string;
  name: string;
  project_type: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      
      const { data: quotes } = await supabase
        .from("quote_requests")
        .select("id, tracking_id, name, project_type, status, created_at")
        .order("created_at", { ascending: false });

      if (quotes) {
        setStats({
          total: quotes.length,
          new: quotes.filter((q) => q.status === "new").length,
          contacted: quotes.filter((q) => q.status === "contacted").length,
          in_progress: quotes.filter((q) => q.status === "in_progress").length,
          quoted: quotes.filter((q) => q.status === "quoted").length,
          closed: quotes.filter((q) => q.status === "closed").length,
        });
        setRecent(quotes.slice(0, 5));
      }
      setLoading(false);
    }
    load();
  }, []);

  const statCards = stats
    ? [
        { label: "Total Quotes", value: stats.total, icon: MessageSquare, color: "text-white bg-white/10" },
        { label: "New", value: stats.new, icon: AlertCircle, color: "text-brand-red bg-brand-red/10" },
        { label: "Contacted", value: stats.contacted, icon: Clock, color: "text-yellow-400 bg-yellow-400/10" },
        { label: "In Progress", value: stats.in_progress, icon: Clock, color: "text-blue-400 bg-blue-400/10" },
        { label: "Quoted", value: stats.quoted, icon: CheckCircle, color: "text-green-400 bg-green-400/10" },
        { label: "Closed", value: stats.closed, icon: CheckCircle, color: "text-gray-400 bg-gray-400/10" },
      ]
    : [];

  const statusColor: Record<string, string> = {
    new: "bg-brand-red/20 text-brand-red",
    contacted: "bg-yellow-400/20 text-yellow-400",
    in_progress: "bg-blue-400/20 text-blue-400",
    quoted: "bg-green-400/20 text-green-400",
    closed: "bg-gray-400/20 text-gray-400",
    spam: "bg-gray-600/20 text-gray-500",
  };

  return (
    <AdminShell>
      <div className="p-6 lg:p-10">
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Overview of your quote requests and business activity.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-red" />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
              {statCards.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-charcoal border border-white/5 p-5">
                  <div className={`w-10 h-10 ${color} flex items-center justify-center mb-3`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
                  <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: "var(--font-body)" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Recent Quotes */}
            <div className="bg-charcoal border border-white/5">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Recent Quotes</h2>
                <Link href="/admin/quotes" className="text-brand-red text-sm font-semibold flex items-center gap-1 hover:underline" style={{ fontFamily: "var(--font-body)" }}>
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              {recent.length === 0 ? (
                <p className="text-gray-500 text-sm p-5" style={{ fontFamily: "var(--font-body)" }}>No quotes yet.</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {recent.map((q) => (
                    <Link key={q.id} href={`/admin/quotes?id=${q.id}`} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{q.name}</span>
                          <span className="text-gray-600 text-xs font-mono">{q.tracking_id}</span>
                        </div>
                        <p className="text-gray-500 text-xs" style={{ fontFamily: "var(--font-body)" }}>{q.project_type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusColor[q.status] || statusColor.new}`}>
                          {q.status.replace("_", " ")}
                        </span>
                        <span className="text-gray-600 text-xs hidden sm:block" style={{ fontFamily: "var(--font-body)" }}>
                          {new Date(q.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
