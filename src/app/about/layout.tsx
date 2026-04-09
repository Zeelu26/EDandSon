import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ed & Son Home Improvements — a family-owned remodeling company with 10+ years of experience serving Livingston, Lebanon, and Central New Jersey.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
