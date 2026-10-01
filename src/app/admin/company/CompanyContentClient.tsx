"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Save } from "lucide-react";

interface Props {
  initialContent: Record<string, string>;
}

export default function CompanyContentClient({ initialContent }: Props) {
  const [formData, setFormData] = useState({
    name: initialContent.name || "SHELL BIOTECH",
    established: initialContent.established || "2013",
    structure: initialContent.structure || "Partnership",
    region: initialContent.region || "Telangana, India",
    founder_placeholder: initialContent.founder_placeholder || "Name1",
    founder_designation: initialContent.founder_designation || "Founder / Partner",
    address:
      initialContent.address ||
      "180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony, Hyderabad – 501505",
    email: initialContent.email || "info@shellbiotech.in",
    phone: initialContent.phone || "+91 8317684883",
    udyam: initialContent.udyam || "UDYAM-TS-09-0239914",
    domain: initialContent.domain || "shellbiotech.in",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const items = Object.entries(formData).map(([key, value]) => ({
        section: "company",
        key,
        value,
      }));

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update company information.");

      setMessage({ type: "success", text: "Company details updated successfully across the entire website." });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to update company information." });
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

      {/* Leadership Details */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">EXECUTIVE LEADERSHIP</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-primary)" }}>
          Founder / Partner Information
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
          Update the placeholder &quot;Name1&quot; once the official verified corporate documentation is ready.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Founder / Partner Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.founder_placeholder}
              onChange={(e) => setFormData({ ...formData, founder_placeholder: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-input"
              value={formData.founder_designation}
              onChange={(e) => setFormData({ ...formData, founder_designation: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Contact & Registration Information */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <span className="eyebrow">ADMINISTRATIVE DIRECTORY</span>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
          Office, Telephone &amp; Registration
        </h3>

        <div className="form-group">
          <label className="form-label">Registered Office Address</label>
          <textarea
            className="form-textarea"
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Official Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">UDYAM Number</label>
            <input
              type="text"
              className="form-input"
              value={formData.udyam}
              onChange={(e) => setFormData({ ...formData, udyam: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operating Territory</label>
            <input
              type="text"
              className="form-input"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
        <Save size={18} /> {loading ? "Updating..." : "Save Corporate Details"}
      </button>
    </form>
  );
}
