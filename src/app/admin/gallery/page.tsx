"use client";

import { useEffect, useState, useRef } from "react";
import AdminShell from "@/components/admin/AdminShell";
import Image from "next/image";
import {
  Upload,
  Loader2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  GripVertical,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  image_path: string;
  sort_order: number;
  visible: boolean;
  created_at: string;
}

const CATEGORIES = [
  "Bathrooms",
  "Kitchens",
  "Tile",
  "Additions",
  "Painting",
  "Patios",
  "Sheetrock",
  "Garages",
  "Other",
];

export default function AdminGalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Bathrooms");
  const [newDescription, setNewDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (Array.isArray(data)) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile || !newTitle.trim()) {
      showMessage("error", "Title and image are required");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      showMessage("error", uploadData.error || "Upload failed");
      setUploading(false);
      return;
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle.trim(),
        category: newCategory,
        description: newDescription.trim(),
        image_url: uploadData.url,
        image_path: uploadData.path,
      }),
    });

    if (res.ok) {
      showMessage("success", "Project added");
      setNewTitle("");
      setNewDescription("");
      setNewCategory("Bathrooms");
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowAdd(false);
      await loadProjects();
    } else {
      showMessage("error", "Failed to save project");
    }

    setUploading(false);
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id, image_path: project.image_path }),
    });

    if (res.ok) {
      showMessage("success", "Project deleted");
      await loadProjects();
    } else {
      showMessage("error", "Delete failed");
    }
  };

  const handleToggleVisible = async (project: Project) => {
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id, visible: !project.visible }),
    });
    await loadProjects();
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= projects.length) return;

    const updated = [...projects];
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];

    const items = updated.map((p, i) => ({ id: p.id, sort_order: i }));

    setProjects(updated);

    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reorder: true, items }),
    });
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-red transition-colors placeholder:text-gray-600";

  return (
    <AdminShell>
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Project Gallery
            </h1>
            <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Manage your project photos. Drag to reorder, toggle visibility, or add new projects.
            </p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn-primary !py-3 !text-xs"
          >
            {showAdd ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Project</>}
          </button>
        </div>

        {/* Status message */}
        {message && (
          <div className={`mb-6 p-4 flex items-center gap-2 text-sm ${
            message.type === "success" ? "bg-green-400/10 text-green-400 border border-green-400/20" : "bg-red-400/10 text-red-400 border border-red-400/20"
          }`} style={{ fontFamily: "var(--font-body)" }}>
            {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}

        {/* Add Project Form */}
        {showAdd && (
          <div className="bg-charcoal border border-white/5 p-6 mb-8">
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Add New Project</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Title *</label>
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Modern Master Bathroom" className={inputClass} />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Category *</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={inputClass}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-charcoal">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Description</label>
                  <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Brief description of the project..." rows={3} className={`${inputClass} resize-none`} />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Image *</label>
                <input type="file" ref={fileRef} accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} className="hidden" />
                {previewUrl ? (
                  <div className="relative aspect-[4/3] bg-charcoal-light overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button onClick={() => { setPreviewUrl(null); setSelectedFile(null); }} className="absolute top-2 right-2 w-8 h-8 bg-black/60 flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()} className="w-full aspect-[4/3] border-2 border-dashed border-white/10 hover:border-brand-red/50 flex flex-col items-center justify-center gap-3 transition-colors">
                    <Upload size={32} className="text-gray-600" />
                    <span className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>Click to upload image</span>
                    <span className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-body)" }}>JPG, PNG, or WebP — max 10MB</span>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6">
              <button onClick={handleUpload} disabled={uploading} className="btn-primary !py-3 !text-xs disabled:opacity-50">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <><Upload size={14} /> Upload & Save</>}
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-red" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-charcoal border border-white/5">
            <Upload size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-sm" style={{ fontFamily: "var(--font-body)" }}>No projects yet. Click "Add Project" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-charcoal border border-white/5 flex items-center gap-4 p-4 ${
                  !project.visible ? "opacity-50" : ""
                }`}
              >
                {/* Grip / Order */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button onClick={() => handleMove(index, "up")} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-20 transition-colors">
                    <ChevronUp size={16} />
                  </button>
                  <button onClick={() => handleMove(index, "down")} disabled={index === projects.length - 1} className="text-gray-500 hover:text-white disabled:opacity-20 transition-colors">
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 h-18 lg:w-32 lg:h-24 shrink-0 overflow-hidden bg-charcoal-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: "var(--font-display)" }}>{project.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{project.category}</p>
                  {project.description && (
                    <p className="text-gray-600 text-xs mt-1 truncate" style={{ fontFamily: "var(--font-body)" }}>{project.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleVisible(project)}
                    className={`p-2 transition-colors ${project.visible ? "text-green-400 hover:text-green-300" : "text-gray-600 hover:text-gray-400"}`}
                    title={project.visible ? "Hide from gallery" : "Show in gallery"}
                  >
                    {project.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600 text-xs mt-4" style={{ fontFamily: "var(--font-body)" }}>
          {projects.length} project{projects.length !== 1 ? "s" : ""} — {projects.filter((p) => p.visible).length} visible on site
        </p>
      </div>
    </AdminShell>
  );
}