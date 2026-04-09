"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import { Expand } from "lucide-react";

const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {/* Filters */}
      {!limit && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                active === cat
                  ? "bg-brand-red text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-charcoal-light"
              onClick={() => setLightbox(project)}
            >
              {/* Placeholder / image area */}
              <div className="absolute inset-0 image-placeholder">
                <span className="text-white/10 text-xs">{project.category}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <p className="text-brand-red text-xs font-semibold tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-body)" }}>
                  {project.category}
                </p>
                <h3 className="text-white text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {project.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <Expand size={16} className="text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full bg-charcoal overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video image-placeholder">
                <span className="text-white/10">{lightbox.title}</span>
              </div>
              <div className="p-6">
                <p className="text-brand-red text-xs font-semibold tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  {lightbox.category}
                </p>
                <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {lightbox.title}
                </h3>
                <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  {lightbox.description}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-lg"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
