import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Quote",
  description: "Check the status of your quote request with Ed & Son Home Improvements.",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
