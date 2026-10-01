import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TelanganaMap from "@/components/TelanganaMap";
import { getDb, initDb } from "@/lib/db";
import { Building2, Users, Truck, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Network | Telangana Healthcare Distribution & Field Representation",
  description:
    "Explore Shell Biotech's pharmaceutical distribution and field sales representation network serving hospitals and healthcare institutions across Telangana.",
};

export const dynamic = "force-dynamic";

export default async function NetworkPage() {
  await initDb();
  const db = getDb();

  const contentResult = await db.execute(`
    SELECT content_key, content_value FROM site_content WHERE section = 'network'
  `);
  const networkInfo: Record<string, string> = {};
  for (const row of contentResult.rows) {
    networkInfo[String(row.content_key)] = String(row.content_value);
  }

  const heroTitle = networkInfo.hero_title || "Distribution & Healthcare Supply Network Across Telangana";
  const overview =
    networkInfo.overview ||
    "Shell Biotech coordinates a structured pharmaceutical distribution network throughout Telangana. Our field sales representatives engage directly with hospital pharmacies, healthcare institutions, and clinicians to ensure dependable availability of vital formulations.";

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
            <span className="eyebrow eyebrow-light">GEOGRAPHIC COVERAGE</span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
                fontWeight: 800,
                maxWidth: "850px",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              {heroTitle}
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.1rem",
                maxWidth: "720px",
                lineHeight: 1.65,
              }}
            >
              {overview}
            </p>
          </div>
        </section>

        {/* Telangana Graphic Map Showcase */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <TelanganaMap showFullDetails={true} />
          </div>
        </section>

        {/* Network Infrastructure Components */}
        <section className="section section-bg-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">NETWORK PILLARS</span>
              <h2>Healthcare Distribution Architecture</h2>
              <p>
                Our regional operations combine localized field representation with coordinated hospital procurement logistics.
              </p>
            </div>

            <div className="grid-3">
              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "20px",
                  }}
                >
                  <Users size={22} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--color-primary)" }}>
                  Field Sales Representation
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                  Professional medical representatives meet directly with physicians, clinical department heads, and pharmacists to present verified formulation data, dosage guidelines, and scientific literature.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "20px",
                  }}
                >
                  <Building2 size={22} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--color-primary)" }}>
                  Hospital &amp; Institutional Supply
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                  Institutional purchase coordination catering to hospital central pharmacies, inpatient formularies, and healthcare organizations across urban and semi-urban medical centers in Telangana.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "var(--color-secondary-tint)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-xs)",
                    marginBottom: "20px",
                  }}
                >
                  <Truck size={22} color="var(--color-secondary)" />
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--color-primary)" }}>
                  Distribution &amp; Batch Traceability
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                  Coordinated inventory dispatch from our central Hyderabad facility ensuring lot number tracking, intact tamper-proof packaging, and rapid replenishment cycles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factual Geographic Scope */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-alt)",
                borderRadius: "var(--radius-xs)",
                padding: "40px",
              }}
            >
              <span className="eyebrow">DISTRIBUTION BOUNDARIES</span>
              <h2 style={{ marginBottom: "16px" }}>Operating Territory Clarification</h2>
              <p style={{ maxWidth: "780px", marginBottom: "24px", lineHeight: 1.7 }}>
                Shell Biotech currently focuses its commercial distribution and healthcare representation exclusively within the state of <strong>Telangana, India</strong>. All distribution agreements, field representative assignments, and healthcare institutional partnerships are structured to serve medical centers in this operating territory.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-primary">
                  Inquire About Institutional Supply <ArrowRight size={16} />
                </Link>
                <Link href="/products" className="btn btn-outline">
                  Browse Product Catalogue
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
