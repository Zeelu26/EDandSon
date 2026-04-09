import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ed & Son Home Improvements for a free quote on your kitchen, bathroom, or home renovation project. Serving Livingston, Lebanon, and Central New Jersey.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
