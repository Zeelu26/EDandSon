import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse our portfolio of completed kitchen remodels, bathroom renovations, home additions, and more across Central New Jersey.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
