"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Save } from "lucide-react";

interface Props {
  initialContent: Record<string, string>;
}

export default function HomepageContentClient({ initialContent }: Props) {
  const [formData, setFormData] = useState({
    hero_title: initialContent.hero_title || "Pharmaceutical Products.\nHealthcare Connections.",
    hero_subtitle:
      initialContent.hero_subtitle ||
      "Shell Biotech bridges verified pharmaceutical manufacturing partners with healthcare institutions, hospital networks, and medical professionals across Telangana.",
    who_we_are_title:
      initialContent.who_we_are_title || "A pharmaceutical partner focused on healthcare connections.",
    who_we_are_text:
      initialContent.who_we_are_text ||
      "Established in 2013 and headquartered in Hyderabad, Shell Biotech operates as a pharmaceutical sourcing, marketing, and distribution organization. Working directly with licensed pharmaceutical manufacturers in other states, we bridge the gap between quality formulation supply and healthcare institutions across Telangana.",
    cta_heading:
      initialContent.cta_heading || "Looking for product information or institutional supply?",
    cta_text:
      initialContent.cta_text ||
      "Connect with our sales and distribution team for catalogue availability, hospital procurement, and partnership inquiries.",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const items = Object.entries(formData).map(([key, value]) => ({
        section: "home",
        key,
        value,
      }));

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update content.");

      setMessage({ type: "success", text: "Homepage content updated and published live!" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to update content." });
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

      {/* Hero Section Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">HOMEPAGE HERO</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
          Hero Headline &amp; Subtitle
        </h3>

        <div className="form-group">
          <label className="form-label">Hero Title (Line break supported)</label>
          <textarea
            className="form-textarea"
            rows={2}
            value={formData.hero_title}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Supporting Subtitle</label>
          <textarea
            className="form-textarea"
            rows={3}
            value={formData.hero_subtitle}
            onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
          />
        </div>
      </div>

      {/* Who We Are Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">EDITORIAL SECTION</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
          Who We Are Overview
        </h3>

        <div className="form-group">
          <label className="form-label">Section Heading</label>
          <input
            type="text"
            className="form-input"
            value={formData.who_we_are_title}
            onChange={(e) => setFormData({ ...formData, who_we_are_title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Paragraph Text</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={formData.who_we_are_text}
            onChange={(e) => setFormData({ ...formData, who_we_are_text: e.target.value })}
          />
        </div>
      </div>

      {/* Call To Action Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">CONVERSION &amp; ENQUIRY</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
          Bottom CTA Section
        </h3>

        <div className="form-group">
          <label className="form-label">CTA Heading</label>
          <input
            type="text"
            className="form-input"
            value={formData.cta_heading}
            onChange={(e) => setFormData({ ...formData, cta_heading: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">CTA Text</label>
          <textarea
            className="form-textarea"
            rows={2}
            value={formData.cta_text}
            onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
        <Save size={18} /> {loading ? "Publishing Changes..." : "Save & Publish Changes"}
      </button>
    </form>
  );
}
