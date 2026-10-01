import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDb, initDb } from "@/lib/db";
import { ShieldCheck, FileCheck, CheckCircle2, AlertCircle, Building2, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality & Compliance | Sourcing Protocols & Regulatory Framework",
  description:
    "Review Shell Biotech's quality assurance framework, partner manufacturing verification criteria, batch documentation protocols, and compliance standards.",
};

export const dynamic = "force-dynamic";

export default async function QualityPage() {
  await initDb();
  const db = getDb();

  const docsResult = await db.execute(`
    SELECT id, title, category, description, file_url, status, created_at
    FROM quality_docs
    ORDER BY id ASC
  `);
  const documents = docsResult.rows;

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
            <span className="eyebrow eyebrow-light">STANDARDS &amp; GOVERNANCE</span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
                fontWeight: 800,
                maxWidth: "840px",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Quality &amp; Compliance Framework
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.1rem",
                maxWidth: "700px",
                lineHeight: 1.65,
              }}
            >
              Quality assurance and strict regulatory alignment govern every facet of Shell Biotech&apos;s pharmaceutical sourcing, partner selection, inventory preservation, and institutional distribution.
            </p>
          </div>
        </section>

        {/* Core Quality Philosophy */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: "56px",
                alignItems: "flex-start",
              }}
              className="quality-split"
            >
              <div>
                <span className="eyebrow">OPERATIONAL INTEGRITY</span>
                <h2 style={{ marginBottom: "20px" }}>Quality Philosophy</h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "20px" }}>
                  Shell Biotech operates with a clear commitment: as a pharmaceutical sourcing and distribution partnership, maintaining the analytical integrity and regulatory traceability of supplied medicines is our primary responsibility to patients and clinicians.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "28px" }}>
                  We do not manufacture products in-house; rather, we bridge licensed pharmaceutical manufacturing partners with institutional healthcare providers in Telangana. Consequently, our quality focus is directed toward supplier qualification, batch release verification, transport stability, and transparent batch documentation.
                </p>

                <div className="notice-box">
                  <strong>Verification Transparency Notice:</strong> Official regulatory certifications, manufacturing licenses, and state drug permits are managed directly by authorized administrators. Certification and regulatory documentation will be published following official administrative verification.
                </div>
              </div>

              {/* Quality Protocol Pillars */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-alt)",
                  borderRadius: "var(--radius-xs)",
                  padding: "36px",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "var(--color-primary)" }}>
                  Partner Sourcing Criteria
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    {
                      title: "Statutory License Auditing",
                      desc: "Manufacturing partners must possess active, unencumbered state drug manufacturing licenses.",
                    },
                    {
                      title: "Batch Certificate of Analysis (COA)",
                      desc: "Every product consignment is received with manufacturer test reports validating pharmacopeial purity.",
                    },
                    {
                      title: "Packaging Integrity & Seal Security",
                      desc: "Systematic physical inspection of tamper-evident seals, blisters, and amber bottles upon receipt.",
                    },
                    {
                      title: "Storage & Cold Chain Protocol",
                      desc: "Strict adherence to recommended temperature limits for probiotics, liquid suspensions, and softgel formulations.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "3px" }} />
                      <div>
                        <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "0.95rem" }}>
                          {item.title}
                        </strong>
                        <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Documentation & Certifications Repository */}
        <section className="section section-bg-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">REGULATORY ARCHIVE</span>
              <h2>Documentation &amp; Compliance Records</h2>
              <p>
                Compliance protocols, standard operating procedures, and regulatory verification documents maintained by Shell Biotech.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {documents.map((doc) => (
                <div
                  key={Number(doc.id)}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <div style={{ maxWidth: "720px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span className="badge badge-secondary">{String(doc.category)}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                        Document Ref: SB-DOC-{Number(doc.id).toString().padStart(3, "0")}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", marginBottom: "6px", color: "var(--color-primary)" }}>
                      {String(doc.title)}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: 0 }}>
                      {String(doc.description || "")}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        backgroundColor: "var(--color-warning-bg)",
                        color: "var(--color-warning)",
                        border: "1px solid #F6E2B3",
                        borderRadius: "var(--radius-xs)",
                        fontWeight: 600,
                      }}
                    >
                      {String(doc.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                border: "1px solid var(--color-border)",
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-xs)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <AlertCircle size={22} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                <em>Hospital &amp; Institutional Notice:</em> Institutional procurement officers requiring batch-specific test reports or statutory drug license documentation for hospital tenders may submit a formal request via our <a href="/contact" style={{ color: "var(--color-secondary)", textDecoration: "underline" }}>Contact &amp; Enquiry portal</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
