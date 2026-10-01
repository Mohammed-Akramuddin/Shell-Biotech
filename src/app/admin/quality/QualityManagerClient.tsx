"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, AlertCircle, FileCheck, ShieldCheck } from "lucide-react";

interface QualityDoc {
  id: number;
  title: string;
  category: string;
  description: string;
  file_url: string;
  status: string;
}

interface Props {
  initialDocs: QualityDoc[];
}

export default function QualityManagerClient({ initialDocs }: Props) {
  const [docs, setDocs] = useState<QualityDoc[]>(initialDocs);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Partner Audit Standards");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState("Verified Document");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/quality-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: newCategory.trim(),
          description: newDesc.trim(),
          file_url: newFileUrl.trim() || "#",
          status: newStatus.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add document.");

      setMessage({ type: "success", text: "Compliance document added successfully." });
      setNewTitle("");
      setNewDesc("");
      setNewFileUrl("");

      // Refresh
      const docRes = await fetch("/api/admin/quality-docs");
      const docData = await docRes.json();
      if (docData.documents) setDocs(docData.documents);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to add document." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this compliance record?")) return;

    try {
      const res = await fetch(`/api/admin/quality-docs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocs((prev) => prev.filter((d) => d.id !== id));
        setMessage({ type: "success", text: "Document removed." });
      }
    } catch (err) {
      console.error("Delete doc error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "900px" }}>
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

      {/* Add New Compliance Document Form */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "32px",
        }}
      >
        <span className="eyebrow">REGULATORY COMPLIANCE</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "16px", color: "var(--color-primary)" }}>
          Publish Verified Certification or Standard Protocol
        </h3>

        <form onSubmit={handleAdd}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Document / Standard Title *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Partner Facility Drug License Audit Verification"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Compliance Category</label>
              <select
                className="form-select"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="Partner Audit Standards">Partner Audit Standards</option>
                <option value="Batch Verification">Batch Verification</option>
                <option value="Storage Compliance">Storage Compliance</option>
                <option value="Statutory License">Statutory License</option>
                <option value="Standard Operating Procedure">Standard Operating Procedure</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Summary / Regulatory Scope</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Explain the scope and audit verification status..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Document File URL / Path</label>
              <input
                type="text"
                className="form-input"
                placeholder="/uploads/... or external document link"
                value={newFileUrl}
                onChange={(e) => setNewFileUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status Label</label>
              <input
                type="text"
                className="form-input"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
            <Plus size={16} /> Publish Quality Document
          </button>
        </form>
      </div>

      {/* Existing Quality Documents */}
      <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Category</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td>
                  <strong>{d.title}</strong>
                  {d.description && (
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      {d.description}
                    </div>
                  )}
                </td>
                <td>
                  <span className="badge badge-secondary">{d.category}</span>
                </td>
                <td>
                  <span className="badge badge-warning">{d.status}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-subtle btn-sm"
                    style={{ color: "var(--color-error)", padding: "4px 8px" }}
                    title="Delete Record"
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
