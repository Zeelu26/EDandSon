import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kitchen remodeling, bathroom renovation, home additions, tile work, painting, patios, sheetrock, and garage renovations in Livingston, Lebanon, and across Central New Jersey.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
