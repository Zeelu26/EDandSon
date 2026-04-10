import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

export const metadata: Metadata = {
  title: {
    default: "Ed & Son Home Improvements | Premium Remodeling in NJ",
    template: "%s | Ed & Son Home Improvements",
  },
  description:
    "Ed & Son Home Improvements delivers premium kitchen, bathroom, and whole-home remodeling in Livingston, Lebanon, and across Central New Jersey. 10+ years of expert craftsmanship.",
  keywords: [
    "home improvement NJ",
    "kitchen remodeling Livingston NJ",
    "bathroom remodeling NJ",
    "home additions New Jersey",
    "tile work NJ",
    "painting contractor NJ",
    "patio construction NJ",
    "Lebanon NJ contractor",
    "Livingston NJ remodeling",
    "premium home renovation New Jersey",
  ],
  openGraph: {
    title: "Ed & Son Home Improvements | Premium Remodeling in NJ",
    description:
      "Premium kitchen, bathroom, and whole-home remodeling across Central New Jersey. 10+ years of expert craftsmanship.",
    type: "website",
    locale: "en_US",
  },
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