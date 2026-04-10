"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminShell from "@/components/admin/AdminShell";
import {
  Search,
  Loader2,
  X,
  ChevronDown,
  Phone,
  Mail,
  Calendar,
  Hash,
  MessageSquare,
  Save,
  Trash2,
} from "lucide-react";

interface Quote {
  id: string;
  tracking_id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  status: string;
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

const STATUSES = ["new", "contacted", "in_progress", "quoted", "closed", "spam"];

const statusColor: Record<string, string> = {
  new: "bg-brand-red/20 text-brand-red",
  contacted: "bg-yellow-400/20 text-yellow-400",
  in_progress: "bg-blue-400/20 text-blue-400",
  quoted: "bg-green-400/20 text-green-400",
  closed: "bg-gray-400/20 text-gray-400",
  spam: "bg-gray-600/20 text-gray-500",
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<Quote | null>(null);
  const [saving, setSaving] = useState(false);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const loadQuotes = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  // Open detail panel
  const openQuote = (q: Quote) => {
    setSelected(q);
    setEditNotes(q.admin_notes || "");
    setEditStatus(q.status);
  };

  // Save changes
  const saveQuote = async () => {
    if (!selected) return;
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("quote_requests")
      .update({
        status: editStatus,
        admin_notes: editNotes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    await loadQuotes();
    setSelected({ ...selected, status: editStatus, admin_notes: editNotes });
    setSaving(false);
  };

  // Delete
  const deleteQuote = async () => {
    if (!selected || !confirm("Delete this quote permanently?")) return;
    const supabase = createClient();
    await supabase.from("quote_requests").delete().eq("id", selected.id);
    setSelected(null);
    await loadQuotes();
  };

  // Filter
  const filtered = quotes.filter((q) => {
    const matchesSearch =
      !search ||
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search) ||
      q.tracking_id?.toLowerCase().includes(search.toLowerCase()) ||
      q.project_type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminShell>
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Quote Requests
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Manage incoming quote requests from your website.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search name, email, phone, tracking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-charcoal border border-white/10 text-white pl-11 pr-4 py-3 text-sm focus:border-brand-red transition-colors placeholder:text-gray-600"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-charcoal border border-white/10 text-white px-4 py-3 text-sm appearance-none pr-10 min-w-[150px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="all">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-red" />
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Table */}
            <div className={`flex-1 min-w-0 ${selected ? "hidden lg:block" : ""}`}>
              <div className="bg-charcoal border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ fontFamily: "var(--font-body)" }}>ID</th>
                        <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ fontFamily: "var(--font-body)" }}>Name</th>
                        <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider px-5 py-3 hidden md:table-cell" style={{ fontFamily: "var(--font-body)" }}>Project</th>
                        <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ fontFamily: "var(--font-body)" }}>Status</th>
                        <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider px-5 py-3 hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-gray-500 text-sm text-center py-12" style={{ fontFamily: "var(--font-body)" }}>
                            No quotes found.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((q) => (
                          <tr
                            key={q.id}
                            onClick={() => openQuote(q)}
                            className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${
                              selected?.id === q.id ? "bg-white/[0.04]" : ""
                            }`}
                          >
                            <td className="px-5 py-4 text-gray-500 text-xs font-mono">{q.tracking_id}</td>
                            <td className="px-5 py-4">
                              <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{q.name}</p>
                              <p className="text-gray-500 text-xs">{q.email}</p>
                            </td>
                            <td className="px-5 py-4 text-gray-400 text-sm hidden md:table-cell" style={{ fontFamily: "var(--font-body)" }}>{q.project_type}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusColor[q.status] || statusColor.new}`}>
                                {q.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell" style={{ fontFamily: "var(--font-body)" }}>
                              {new Date(q.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-3" style={{ fontFamily: "var(--font-body)" }}>
                {filtered.length} of {quotes.length} quotes
              </p>
            </div>

            {/* Detail Panel */}
            {selected && (
              <div className="w-full lg:w-[420px] shrink-0 bg-charcoal border border-white/5 self-start sticky top-6">
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <h3 className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Quote Detail</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-5 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Tracking ID */}
                  <div className="flex items-center gap-2 text-sm">
                    <Hash size={14} className="text-brand-red" />
                    <span className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>Tracking ID:</span>
                    <span className="text-white font-mono font-bold">{selected.tracking_id}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</p>
                    <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                      <Phone size={14} className="text-brand-red" /> {selected.phone}
                    </a>
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                      <Mail size={14} className="text-brand-red" /> {selected.email}
                    </a>
                    <div className="flex items-center gap-2 text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                      <Calendar size={14} className="text-brand-red" /> {new Date(selected.created_at).toLocaleString()}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="bg-white/[0.03] border border-white/5 p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Project Type</p>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{selected.project_type}</p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/5 p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      <MessageSquare size={12} className="inline mr-1" /> Message
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{selected.message}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-body)" }}>Status</label>
                    <div className="relative">
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm appearance-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-charcoal">{s.replace("_", " ").toUpperCase()}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-body)" }}>Internal Notes</label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add notes about this quote..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm resize-none focus:border-brand-red transition-colors placeholder:text-gray-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={saveQuote}
                      disabled={saving}
                      className="btn-primary flex-1 justify-center !py-3 !text-xs disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save Changes</>}
                    </button>
                    <button
                      onClick={deleteQuote}
                      className="px-4 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
