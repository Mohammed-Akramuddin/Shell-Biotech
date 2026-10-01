"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Save } from "lucide-react";

interface Props {
  initialContent: Record<string, string>;
}

export default function NetworkContentClient({ initialContent }: Props) {
  const [formData, setFormData] = useState({
    hero_title:
      initialContent.hero_title ||
      "Distribution & Healthcare Supply Network Across Telangana",
    overview:
      initialContent.overview ||
      "Shell Biotech coordinates a structured pharmaceutical distribution network throughout Telangana. Our field sales representatives engage directly with hospital pharmacies, healthcare institutions, and clinicians to ensure dependable availability of vital formulations.",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const items = Object.entries(formData).map(([key, value]) => ({
        section: "network",
        key,
        value,
      }));

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update network content.");

      setMessage({ type: "success", text: "Network information updated successfully." });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to update network information." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "860px" }}>
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

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">TELANGANA COVERAGE</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
          Network Page Text &amp; Scope
        </h3>

        <div className="form-group">
          <label className="form-label">Network Hero Title</label>
          <input
            type="text"
            className="form-input"
            value={formData.hero_title}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Regional Overview &amp; Field Representation Summary</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
        <Save size={18} /> {loading ? "Updating..." : "Save Network Information"}
      </button>
    </form>
  );
}
