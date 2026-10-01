"use client";

import React, { useState } from "react";
import { Trash2, CheckCircle2, AlertCircle, Search, Mail, Phone, Building2, Package, Calendar } from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  subject: string;
  message: string;
  product_slug: string | null;
  product_name: string | null;
  status: string;
  created_at: string;
}

interface Props {
  initialEnquiries: Enquiry[];
}

export default function EnquiriesManagerClient({ initialEnquiries }: Props) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error("Update enquiry error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
        setMessage({ type: "success", text: "Enquiry record deleted." });
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = filterStatus === "All" || e.status === filterStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      (e.company && e.company.toLowerCase().includes(q)) ||
      (e.product_name && e.product_name.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
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

      {/* Control bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", width: "320px" }}>
          <Search
            size={16}
            color="var(--color-text-subtle)"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "36px", paddingRight: "12px", paddingBottom: "10px", paddingTop: "10px" }}
            placeholder="Search by sender, hospital, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {["All", "New", "Read", "Contacted", "Closed"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(s)}
              className={`btn btn-sm ${filterStatus === s ? "btn-primary" : "btn-subtle"}`}
              style={{ padding: "6px 12px" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Enquiries Layout: Table & Detail Drawer */}
      <div style={{ display: "grid", gridTemplateColumns: selectedEnquiry ? "1.2fr 1fr" : "1fr", gap: "24px" }}>
        {/* Table */}
        <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Sender / Hospital</th>
                <th>Subject / Context</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => {
                      setSelectedEnquiry(enq);
                      if (enq.status === "New") {
                        handleUpdateStatus(enq.id, "Read");
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedEnquiry?.id === enq.id ? "#EEF4F0" : undefined,
                    }}
                  >
                    <td>
                      <strong style={{ color: "var(--color-primary)" }}>{enq.name}</strong>
                      {enq.company && (
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                          {enq.company}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--color-text)" }}>
                        {enq.subject}
                      </div>
                      {enq.product_name && (
                        <span className="badge badge-secondary" style={{ marginTop: "4px", fontSize: "0.7rem" }}>
                          Product: {enq.product_name}
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          enq.status === "New"
                            ? "badge-warning"
                            : enq.status === "Contacted"
                            ? "badge-primary"
                            : enq.status === "Closed"
                            ? "badge-outline"
                            : "badge-success"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", whiteSpace: "nowrap" }}>
                      {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : "Recent"}
                    </td>
                    <td style={{ textAlign: "right" }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleDelete(enq.id)}
                        className="btn btn-subtle btn-sm"
                        style={{ color: "var(--color-error)", padding: "4px 8px" }}
                        title="Delete Enquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--color-text-muted)" }}>
                    No enquiries match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Enquiry Detailed View */}
        {selectedEnquiry && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xs)",
              padding: "28px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: "6px" }}>COMMUNICATION RECORD</span>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-subtle)" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", fontSize: "0.875rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <strong style={{ color: "var(--color-primary)", minWidth: "90px" }}>Sender:</strong>
                <span>{selectedEnquiry.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={14} color="var(--color-secondary)" />
                <a href={`mailto:${selectedEnquiry.email}`} style={{ color: "var(--color-secondary)", fontWeight: 600 }}>
                  {selectedEnquiry.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={14} color="var(--color-secondary)" />
                <a href={`tel:${selectedEnquiry.phone}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.company && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Building2 size={14} color="var(--color-secondary)" />
                  <span>{selectedEnquiry.company}</span>
                </div>
              )}
              {selectedEnquiry.product_name && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Package size={14} color="var(--color-secondary)" />
                  <span>Selected Product: <strong>{selectedEnquiry.product_name}</strong></span>
                </div>
              )}
            </div>

            <div
              style={{
                backgroundColor: "var(--color-bg-alt)",
                border: "1px solid var(--color-border-subtle)",
                padding: "16px",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "var(--color-text)",
                marginBottom: "24px",
                whiteSpace: "pre-line",
              }}
            >
              {selectedEnquiry.message}
            </div>

            {/* Status Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>
                Update Status:
              </label>
              <select
                className="form-select"
                style={{ width: "auto", padding: "6px 12px" }}
                value={selectedEnquiry.status}
                onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
              >
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
