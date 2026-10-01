"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, ExternalLink, X, Briefcase, Users } from "lucide-react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  deadline: string;
  status: string;
}

interface Application {
  id: number;
  job_id: number | null;
  job_title: string;
  applicant_name: string;
  email: string;
  phone: string;
  resume_url: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface Props {
  initialJobs: Job[];
  initialApplications: Application[];
}

export default function CareersManagerClient({ initialJobs, initialApplications }: Props) {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Job form state
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "",
    location: "Hyderabad, Telangana",
    employment_type: "Full-Time",
    description: "",
    requirements: "",
    deadline: "Open until filled",
    status: "Active",
  });

  const openAddJob = () => {
    setEditingJob(null);
    setJobFormData({
      title: "",
      department: "",
      location: "Hyderabad, Telangana",
      employment_type: "Full-Time",
      description: "",
      requirements: "",
      deadline: "Open until filled",
      status: "Active",
    });
    setIsJobModalOpen(true);
  };

  const openEditJob = (job: Job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      employment_type: job.employment_type,
      description: job.description,
      requirements: job.requirements,
      deadline: job.deadline,
      status: job.status,
    });
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url = "/api/admin/jobs";
      const method = editingJob ? "PUT" : "POST";
      const body = editingJob ? { ...jobFormData, id: editingJob.id } : jobFormData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save job.");

      setMessage({ type: "success", text: editingJob ? "Job updated successfully." : "Job created." });

      const updatedRes = await fetch("/api/admin/jobs");
      const updatedData = await updatedRes.json();
      if (updatedData.jobs) setJobs(updatedData.jobs);

      setIsJobModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to save job." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this job opening?")) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
        setMessage({ type: "success", text: "Job opening deleted." });
      }
    } catch (err) {
      console.error("Delete job error:", err);
    }
  };

  const handleUpdateAppStatus = async (appId: number, status: string) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status } : a))
        );
      }
    } catch (err) {
      console.error("Update app error:", err);
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        setMessage({ type: "success", text: "Application record removed." });
      }
    } catch (err) {
      console.error("Delete app error:", err);
    }
  };

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

      {/* Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          className={`btn btn-sm ${activeTab === "jobs" ? "btn-primary" : "btn-subtle"}`}
        >
          <Briefcase size={16} /> Job Openings ({jobs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          className={`btn btn-sm ${activeTab === "applications" ? "btn-primary" : "btn-subtle"}`}
        >
          <Users size={16} /> Received Applications ({applications.length})
        </button>
      </div>

      {/* Tab 1: Jobs */}
      {activeTab === "jobs" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button type="button" onClick={openAddJob} className="btn btn-primary btn-sm">
              <Plus size={16} /> Post New Job
            </button>
          </div>

          <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <strong>{j.title}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                        Deadline: {j.deadline}
                      </div>
                    </td>
                    <td>{j.department}</td>
                    <td>
                      <span className="badge badge-secondary">{j.employment_type}</span>
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>{j.location}</td>
                    <td>
                      <span
                        className={`badge ${
                          j.status === "Active" ? "badge-success" : "badge-outline"
                        }`}
                      >
                        {j.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          type="button"
                          onClick={() => openEditJob(j)}
                          className="btn btn-subtle btn-sm"
                          style={{ padding: "6px 10px" }}
                          title="Edit Job"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(j.id)}
                          className="btn btn-subtle btn-sm"
                          style={{ padding: "6px 10px", color: "var(--color-error)" }}
                          title="Delete Job"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Applications */}
      {activeTab === "applications" && (
        <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Position</th>
                <th>Contact</th>
                <th>Resume</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <strong>{app.applicant_name}</strong>
                      {app.message && (
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "4px", maxWidth: "260px" }}>
                          &quot;{app.message}&quot;
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-primary">{app.job_title}</span>
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>
                      <div>{app.email}</div>
                      <div style={{ color: "var(--color-text-subtle)", fontFamily: "monospace" }}>{app.phone}</div>
                    </td>
                    <td>
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            color: "var(--color-secondary)",
                            fontWeight: 600,
                            fontSize: "0.825rem",
                          }}
                        >
                          View Resume <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ color: "var(--color-text-subtle)", fontSize: "0.8rem" }}>—</span>
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        style={{ padding: "4px 8px", fontSize: "0.8rem", width: "auto" }}
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteApp(app.id)}
                        className="btn btn-subtle btn-sm"
                        style={{ color: "var(--color-error)", padding: "4px 8px" }}
                        title="Delete Application"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "var(--color-text-muted)" }}>
                    No job applications received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Adding / Editing Job */}
      {isJobModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(7, 20, 33, 0.6)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-xs)",
              width: "100%",
              maxWidth: "620px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {editingJob ? "Edit Job Posting" : "Create Career Opportunity"}
              </h3>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-subtle)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleJobSubmit}>
              <div className="form-group">
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  placeholder="e.g. Territory Sales Executive"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={jobFormData.department}
                    onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    placeholder="e.g. Sales & Representation"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-select"
                    value={jobFormData.employment_type}
                    onChange={(e) => setJobFormData({ ...jobFormData, employment_type: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship (3-6 Months)">Internship (3-6 Months)</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Territory / Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Application Deadline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={jobFormData.deadline}
                    onChange={(e) => setJobFormData({ ...jobFormData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  required
                  className="form-textarea"
                  rows={3}
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  placeholder="Responsibilities and day-to-day duties..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Requirements</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={jobFormData.requirements}
                  onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                  placeholder="Required pharmacy degree, experience, or skills..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={jobFormData.status}
                  onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
                  {loading ? "Saving..." : editingJob ? "Update Job" : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
