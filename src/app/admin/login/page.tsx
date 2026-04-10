"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-red mx-auto mb-6 flex items-center justify-center">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Ed & Son Home Improvements
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:border-brand-red transition-colors placeholder:text-gray-500"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:border-brand-red transition-colors placeholder:text-gray-500"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 border border-red-400/20">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center !py-4 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-8" style={{ fontFamily: "var(--font-body)" }}>
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}
