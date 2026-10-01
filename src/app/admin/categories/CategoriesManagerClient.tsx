"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, AlertCircle, Layers } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  initialCategories: CategoryItem[];
}

export default function CategoriesManagerClient({ initialCategories }: Props) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName.trim(),
          slug: newCatSlug.trim() || newCatName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add category.");

      setMessage({ type: "success", text: "Category created successfully." });
      setNewCatName("");
      setNewCatSlug("");

      // Refresh
      const catRes = await fetch("/api/admin/categories");
      const catData = await catRes.json();
      if (catData.categories) setCategories(catData.categories);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to add category." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setMessage({ type: "success", text: "Category deleted." });
      }
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      {message && (
        <div
          style={{
            padding: "12px 18px",
            borderRadius: "var(--radius-xs)",
            marginBottom: "20px",
            backgroundColor: message.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
            color: message.type === "success" ? "var(--color-success)" : "var(--color-error)",
            border: `1px solid ${message.type === "success" ? "#C8E6D3" : "#F3CACA"}`,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add New Category Box */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--color-primary)" }}>
          Create New Dosage Category
        </h3>

        <form onSubmit={handleAdd} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px" }}>
          <input
            type="text"
            className="form-input"
            required
            placeholder="Category Name (e.g. Injections / Ointments)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Slug (optional, e.g. injections)"
            value={newCatSlug}
            onChange={(e) => setNewCatSlug(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add Category
          </button>
        </form>
      </div>

      {/* Existing Categories Table */}
      <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>ID</th>
              <th>Category Name</th>
              <th>URL Slug</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                  <strong>{c.name}</strong>
                </td>
                <td style={{ fontFamily: "monospace", color: "var(--color-secondary)" }}>
                  {c.slug}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-subtle btn-sm"
                    style={{ color: "var(--color-error)", padding: "4px 8px" }}
                    title="Delete Category"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
