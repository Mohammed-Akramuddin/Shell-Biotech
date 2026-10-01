"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface JobItem {
  id: number;
  title: string;
}

interface JobApplicationFormProps {
  jobs: JobItem[];
}

export default function JobApplicationForm({ jobs }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    job_id: jobs.length > 0 ? String(jobs[0].id) : "",
    job_title: jobs.length > 0 ? jobs[0].title : "General Application",
    resume_url: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleJobSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const found = jobs.find((j) => String(j.id) === selectedId);
    setFormData((prev) => ({
      ...prev,
      job_id: selectedId,
      job_title: found ? found.title : "General Application",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccess(true);
      setFormData({
        applicant_name: "",
        email: "",
        phone: "",
        job_id: jobs.length > 0 ? String(jobs[0].id) : "",
        job_title: jobs.length > 0 ? jobs[0].title : "General Application",
        resume_url: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          backgroundColor: "var(--color-success-bg)",
          border: "1px solid #C8E6D3",
          borderRadius: "var(--radius-xs)",
          padding: "36px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-flex", color: "var(--color-success)", marginBottom: "12px" }}>
          <CheckCircle2 size={40} />
        </div>
        <h3 style={{ color: "var(--color-success)", fontSize: "1.3rem", marginBottom: "8px" }}>
          Application Received
        </h3>
        <p style={{ color: "var(--color-text)", maxWidth: "460px", margin: "0 auto 20px auto", fontSize: "0.95rem" }}>
          Thank you for applying to Shell Biotech. Our administrative recruitment team will review your credentials and contact qualified candidates directly.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn btn-secondary btn-sm"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xs)",
        padding: "36px",
        boxShadow: "var(--shadow-subtle)",
      }}
    >
      <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", color: "var(--color-primary)" }}>
        Apply for a Position
      </h3>
      <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
        Complete the application form below. Candidates may apply for active positions or submit a general internship profile.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "var(--color-error-bg)",
            border: "1px solid #F3CACA",
            color: "var(--color-error)",
            padding: "12px 16px",
            borderRadius: "var(--radius-xs)",
            marginBottom: "20px",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="applicant_name">Full Name *</label>
          <input
            id="applicant_name"
            type="text"
            className="form-input"
            required
            placeholder="e.g. Ramesh Kumar"
            value={formData.applicant_name}
            onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            className="form-input"
            required
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone / Mobile *</label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="job_id">Select Position *</label>
          <select
            id="job_id"
            className="form-select"
            value={formData.job_id}
            onChange={handleJobSelect}
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
            <option value="general">General / Unsolicited Application</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="resume_url">Resume / LinkedIn Profile / Portfolio Link *</label>
        <input
          id="resume_url"
          type="text"
          className="form-input"
          required
          placeholder="https://drive.google.com/... or LinkedIn URL"
          value={formData.resume_url}
          onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
        />
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginTop: "4px" }}>
          Provide a link to your Google Drive resume, cloud CV link, or LinkedIn profile.
        </span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Statement of Experience / Cover Note</label>
        <textarea
          id="message"
          className="form-textarea"
          rows={4}
          placeholder="Summarize your background, pharmacy/sales qualifications, or interest in Shell Biotech..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {loading ? "Submitting Application..." : "Submit Application"} <Send size={16} />
      </button>
    </form>
  );
}
