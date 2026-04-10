"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Home,
  Menu,
  X,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quotes", icon: MessageSquare },
  { href: "/admin/content", label: "Site Content", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const nav = (
    <>
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-red flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
            E
          </div>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Ed & Son</p>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-brand-red/10 text-brand-red border-l-2 border-brand-red"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <Home size={18} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors w-full text-left"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-charcoal border-r border-white/5 z-40">
        {nav}
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-charcoal border-b border-white/5 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-red flex items-center justify-center text-white font-bold text-xs">E</div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMobileOpen(false)}>
          <aside className="w-64 h-full bg-charcoal flex flex-col" onClick={(e) => e.stopPropagation()}>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
