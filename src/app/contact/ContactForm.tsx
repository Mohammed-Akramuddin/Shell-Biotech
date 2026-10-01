"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Package } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: productParam ? `Product Enquiry: ${productParam}` : "",
    message: productParam
      ? `We would like to request procurement details and availability information regarding ${productParam} for our healthcare facility.`
      : "",
    product_name: productParam,
  });

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        product_name: productParam,
        subject: `Product Enquiry: ${productParam}`,
        message: `We would like to request procurement details and availability information regarding ${productParam} for our healthcare facility.`,
      }));
    }
  }, [productParam]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        product_name: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please contact us by phone or email.");
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
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-flex", color: "var(--color-success)", marginBottom: "16px" }}>
          <CheckCircle2 size={44} />
        </div>
        <h3 style={{ color: "var(--color-success)", fontSize: "1.35rem", marginBottom: "8px" }}>
          Enquiry Received
        </h3>
        <p style={{ color: "var(--color-text)", maxWidth: "460px", margin: "0 auto 24px auto", fontSize: "0.95rem" }}>
          Thank you for reaching out to Shell Biotech. Our sales and institutional supply team has received your communication and will respond within 1 business day.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn btn-secondary btn-sm"
        >
          Send Another Message
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
      {productParam && (
        <div
          style={{
            backgroundColor: "var(--color-secondary-tint)",
            border: "1px solid #C8D8CF",
            padding: "12px 16px",
            borderRadius: "var(--radius-xs)",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem",
            color: "var(--color-primary)",
          }}
        >
          <Package size={18} color="var(--color-secondary)" />
          <span>
            Inquiring about product: <strong>{productParam}</strong>
          </span>
        </div>
      )}

      <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", color: "var(--color-primary)" }}>
        Send an Enquiry
      </h3>
      <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
        Complete the enquiry form below. Enquiries are routed directly to our sales and institutional supply department.
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
          <label className="form-label" htmlFor="name">Full Name *</label>
          <input
            id="name"
            type="text"
            className="form-input"
            required
            placeholder="Dr. / Mr. / Ms. Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            className="form-input"
            required
            placeholder="name@institution.com"
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
            placeholder="+91 83176 84883"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="company">Hospital / Healthcare Organization</label>
          <input
            id="company"
            type="text"
            className="form-input"
            placeholder="Hospital / Clinic / Pharmacy Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="subject">Subject *</label>
        <input
          id="subject"
          type="text"
          className="form-input"
          required
          placeholder="Institutional Procurement / Product Availability / Territory Enquiry"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message *</label>
        <textarea
          id="message"
          className="form-textarea"
          rows={5}
          required
          placeholder="Please describe your product inquiry, required volume, institutional location, or partnership proposal..."
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
        {loading ? "Submitting Enquiry..." : "Submit Enquiry"} <Send size={16} />
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
