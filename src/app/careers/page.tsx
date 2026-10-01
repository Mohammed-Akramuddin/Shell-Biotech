import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobApplicationForm from "./JobApplicationForm";
import { getDb, initDb } from "@/lib/db";
import { Briefcase, MapPin, Clock, CheckCircle2, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Internships | Work With Shell Biotech",
  description:
    "Explore career opportunities in pharmaceutical sales representation, healthcare distribution, institutional logistics, and operations internships at Shell Biotech.",
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  await initDb();
  const db = getDb();

  const jobsResult = await db.execute(`
    SELECT id, title, department, location, employment_type, description, requirements, deadline, status
    FROM jobs
    WHERE status = 'Active'
    ORDER BY id ASC
  `);
  const jobs = jobsResult.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    department: String(row.department),
    location: String(row.location),
    employment_type: String(row.employment_type),
    description: String(row.description),
    requirements: String(row.requirements),
    deadline: String(row.deadline || "Open"),
  }));

  return (
    <>
      <Navbar isHeroOverlay={false} />

      <main style={{ paddingTop: "88px" }}>
        {/* Page Hero */}
        <section
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
            paddingTop: "64px",
            paddingBottom: "64px",
            borderBottom: "1px solid var(--color-primary-light)",
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">TALENT &amp; OPPORTUNITY</span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
                fontWeight: 800,
                maxWidth: "800px",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Careers &amp; Internships at Shell Biotech
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.1rem",
                maxWidth: "680px",
                lineHeight: 1.6,
              }}
            >
              Join our growing team in pharmaceutical sales representation, institutional supply chain management, and regulatory coordination across Telangana.
            </p>
          </div>
        </section>

        {/* Work Culture & Structure */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">PROFESSIONAL ENVIRONMENT</span>
              <h2>Work With Shell Biotech</h2>
              <p>
                We foster a disciplined, ethical pharmaceutical environment focused on authentic doctor engagement, institutional compliance, and professional field development.
              </p>
            </div>

            <div className="grid-3" style={{ marginBottom: "64px" }}>
              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "16px",
                  }}
                >
                  <Briefcase size={20} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--color-primary)" }}>
                  Field Representation
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Structured training for medical sales representatives with direct clinical exposure, product portfolios, and territory responsibility.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "16px",
                  }}
                >
                  <GraduationCap size={20} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--color-primary)" }}>
                  Internship Programs
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Hands-on internships for pharmacy, biotechnology, and management students covering procurement documentation and hospital supply workflows.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "16px",
                  }}
                >
                  <Clock size={20} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--color-primary)" }}>
                  Transparent Career Growth
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Performance-oriented opportunities with clear territorial advancement, incentive structures, and operational leadership pathways.
                </p>
              </div>
            </div>

            {/* Current Open Positions */}
            <div className="section-header">
              <span className="eyebrow">OPEN ROLES</span>
              <h2>Current Opportunities</h2>
              <p>Review active openings across our Telangana field network and Hyderabad office.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    backgroundColor: "var(--color-bg-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "16px",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <span className="badge badge-secondary" style={{ marginBottom: "8px" }}>
                        {job.department}
                      </span>
                      <h3 style={{ fontSize: "1.35rem", color: "var(--color-primary)", fontWeight: 800 }}>
                        {job.title}
                      </h3>
                    </div>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <span className="badge badge-primary">{job.employment_type}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)",
                      marginBottom: "18px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={15} color="var(--color-secondary)" /> {job.location}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={15} color="var(--color-secondary)" /> Deadline: {job.deadline}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "16px", color: "var(--color-text)" }}>
                    {job.description}
                  </p>

                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--color-border-subtle)",
                      padding: "16px",
                      borderRadius: "var(--radius-xs)",
                      fontSize: "0.875rem",
                    }}
                  >
                    <strong style={{ color: "var(--color-primary)" }}>Candidate Profile / Requirements: </strong>
                    <span style={{ color: "var(--color-text-muted)" }}>{job.requirements}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Section */}
            <div id="apply-section">
              <JobApplicationForm jobs={jobs} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
