import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ed & Son Home Improvements | Premium Remodeling in NJ",
    template: "%s | Ed & Son Home Improvements",
  },
  description:
    "Ed & Son Home Improvements delivers premium kitchen, bathroom, and whole-home remodeling in Livingston, Lebanon, and across Central New Jersey. 10+ years of expert craftsmanship.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}