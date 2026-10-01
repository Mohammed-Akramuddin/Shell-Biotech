import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfficeCarousel from "@/components/OfficeCarousel";
import { getDb, initDb } from "@/lib/db";
import { Building2, ShieldCheck, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Company | Sourcing, Marketing & Healthcare Distribution",
  description:
    "Learn about Shell Biotech, established in 2013 in Hyderabad, Telangana. Sourcing pharmaceutical formulations via partner manufacturers for hospital and institutional supply.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  await initDb();
  const db = getDb();

  const contentResult = await db.execute(`
    SELECT content_key, content_value FROM site_content WHERE section = 'company'
  `);
  const companyInfo: Record<string, string> = {};
  for (const row of contentResult.rows) {
    companyInfo[String(row.content_key)] = String(row.content_value);
  }

  const founderName = companyInfo.founder_placeholder || "Name1";
  const founderDesignation = companyInfo.founder_designation || "Founder / Partner";
  const establishedYear = companyInfo.established || "2013";
  const structure = companyInfo.structure || "Partnership";
  const region = companyInfo.region || "Telangana, India";
  const address =
    companyInfo.address ||
    "180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony, Hyderabad – 501505";
  const email = companyInfo.email || "info@shellbiotech.in";
  const phone = companyInfo.phone || "+91 8317684883";
  const udyam = companyInfo.udyam || "UDYAM-TS-09-0239914";

  return (
    <>
      <Navbar isHeroOverlay={false} />

      <main style={{ paddingTop: "88px" }}>
        {/* ========================================================
            PAGE HERO
            ======================================================== */}
        <section
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
            paddingTop: "72px",
            paddingBottom: "72px",
            borderBottom: "1px solid var(--color-primary-light)",
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">ABOUT SHELL BIOTECH</span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 800,
                maxWidth: "850px",
                lineHeight: 1.15,
                marginBottom: "20px",
              }}
            >
              Pharmaceutical sourcing and marketing built on healthcare connections.
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.15rem",
                maxWidth: "720px",
                lineHeight: 1.65,
              }}
            >
              Shell Biotech is an Indian pharmaceutical distribution partnership founded in 2013 in Hyderabad, Telangana. We connect verified pharmaceutical manufacturing partners to healthcare networks through dedicated sales representation and institutional supply.
            </p>
          </div>
        </section>

        {/* ========================================================
            WHO WE ARE & BUSINESS MODEL CLARIFICATION
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "56px",
                alignItems: "flex-start",
              }}
              className="about-split"
            >
              <div>
                <span className="eyebrow">ORGANIZATIONAL PROFILE</span>
                <h2 style={{ marginBottom: "20px" }}>Who We Are</h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "20px" }}>
                  Shell Biotech was established in 2013 as a partnership firm based in Hyderabad, Telangana. The enterprise was formed to address regional requirements for dependable pharmaceutical product availability across institutional healthcare facilities, hospital pharmacies, and medical practices.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "32px" }}>
                  Rather than functioning as a speculative pharmaceutical trading entity, Shell Biotech operates through systematic relationships with accredited pharmaceutical manufacturing companies located in manufacturing clusters across India, providing them with compliant, structured sales representation and market access within Telangana.
                </p>

                {/* Explicit Business Model Box */}
                <div
                  style={{
                    backgroundColor: "var(--color-bg-alt)",
                    border: "1px solid var(--color-border)",
                    borderLeft: "4px solid var(--color-secondary)",
                    padding: "24px",
                    borderRadius: "var(--radius-xs)",
                  }}
                >
                  <h4 style={{ color: "var(--color-primary)", marginBottom: "8px" }}>
                    Our Business Model: Sourcing &amp; Distribution
                  </h4>
                  <p style={{ fontSize: "0.925rem", lineHeight: 1.7, color: "var(--color-text)" }}>
                    Shell Biotech does <strong>not</strong> own an in-house pharmaceutical manufacturing facility. All pharmaceutical formulations in our portfolio are manufactured by licensed third-party pharmaceutical manufacturing partners. Shell Biotech is responsible for regulatory documentation verification, product sourcing, brand commercialization, field sales representation, and institutional hospital delivery.
                  </p>
                </div>
              </div>

              {/* Company Facts Editorial Card */}
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-alt)",
                  borderRadius: "var(--radius-xs)",
                  padding: "36px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "24px",
                    borderBottom: "1px solid var(--color-border)",
                    paddingBottom: "14px",
                  }}
                >
                  Corporate Information
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Company Name
                    </span>
                    <strong style={{ fontSize: "1rem", color: "var(--color-primary)" }}>SHELL BIOTECH</strong>
                  </div>

                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Established
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>{establishedYear}</span>
                  </div>

                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Business Structure
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>{structure}</span>
                  </div>

                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Operating Territory
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>{region}</span>
                  </div>

                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Enterprise Registration
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)", fontFamily: "monospace" }}>{udyam}</span>
                  </div>

                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Official Domain
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>shellbiotech.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PARTNER RELATIONSHIP & SUPPLY ARCHITECTURE
            ======================================================== */}
        <section className="section section-bg-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">COLLABORATION ARCHITECTURE</span>
              <h2>Manufacturing Partner Relationship</h2>
              <p>
                How Shell Biotech collaborates with pharmaceutical manufacturers to maintain continuous, verified healthcare supply.
              </p>
            </div>

            <div className="grid-3">
              <div className="card" style={{ padding: "32px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  PHASE 01
                </span>
                <h3 style={{ fontSize: "1.2rem", margin: "12px 0", color: "var(--color-primary)" }}>
                  Partner Facility Vetting
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Formulations are procured solely from licensed third-party manufacturing facilities possessing statutory state drug licenses, strict analytical controls, and validated batch documentation.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  PHASE 02
                </span>
                <h3 style={{ fontSize: "1.2rem", margin: "12px 0", color: "var(--color-primary)" }}>
                  Commercial &amp; Field Marketing
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Our professional sales representatives introduce verified product literature, dosage forms, and composition data directly to clinicians and institutional hospital purchase heads.
                </p>
              </div>

              <div className="card" style={{ padding: "32px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  PHASE 03
                </span>
                <h3 style={{ fontSize: "1.2rem", margin: "12px 0", color: "var(--color-primary)" }}>
                  Hospital Network Supply
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Distribution is coordinated from our central Hyderabad base to hospital pharmacies, clinics, and nursing facilities, maintaining intact packaging and lot-level traceability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PARTNERSHIP GOVERNANCE & STRUCTURE
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">CORPORATE GOVERNANCE</span>
              <h2>Partnership Structure &amp; Operations</h2>
              <p>Institutional oversight governing Shell Biotech&apos;s commercial sourcing and regional distribution partnerships.</p>
            </div>

            <div
              style={{
                backgroundColor: "var(--color-bg-alt)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "36px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }} className="grid-3">
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-secondary)", display: "block", marginBottom: "8px" }}>
                    Entity Type
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "8px" }}>
                    Partnership Firm
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                    Formed in 2013 under Indian statutory partnership regulations to manage regional pharmaceutical sourcing and healthcare supply networks.
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-secondary)", display: "block", marginBottom: "8px" }}>
                    Operational Mandate
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "8px" }}>
                    Healthcare Sourcing &amp; Marketing
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                    Focusing on connecting licensed pharmaceutical manufacturers with hospitals, clinical department heads, and medical institutions across Telangana.
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-secondary)", display: "block", marginBottom: "8px" }}>
                    Statutory Registration
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "8px" }}>
                    UDYAM-TS-09-0239914
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                    Registered MSME partnership entity headquartered in Sunrise Colony, Kuntloor, Hyderabad – 501505, Telangana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            REGISTERED OFFICE & FUTURE DIRECTION
            ======================================================== */}
        <section className="section section-bg-alt">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "center",
              }}
              className="about-split"
            >
              <div>
                <span className="eyebrow">HEADQUARTERS &amp; FACILITY</span>
                <h2 style={{ marginBottom: "20px" }}>Registered Office</h2>
                <p style={{ marginBottom: "20px" }}>
                  Our administrative operations and central distribution coordinating office are located in Hyderabad, Telangana.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <MapPin size={20} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>{address}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <Phone size={20} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                    <a href={`tel:${phone}`} style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-primary)" }}>
                      {phone}
                    </a>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <Mail size={20} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                    <a href={`mailto:${email}`} style={{ fontSize: "0.95rem", color: "var(--color-primary)" }}>
                      {email}
                    </a>
                  </div>
                </div>

                <Link href="/contact" className="btn btn-primary">
                  Contact Administrative Team <ArrowRight size={16} />
                </Link>
              </div>

              {/* Office Image Carousel */}
              <OfficeCarousel />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
