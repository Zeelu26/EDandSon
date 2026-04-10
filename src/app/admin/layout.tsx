import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ed & Son Home Improvements",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111]">
      {children}
    </div>
  );
}
