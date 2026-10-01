import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { getDb, initDb } from "@/lib/db";
import { MapPin, Phone, Mail, Building2, Clock, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Institutional Enquiry | Shell Biotech",
  description:
    "Contact Shell Biotech for pharmaceutical product enquiries, institutional hospital supply, and partnership coordination in Telangana. Headquartered in Hyderabad.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  await initDb();
  const db = getDb();

  const contentResult = await db.execute(`
    SELECT content_key, content_value FROM site_content WHERE section = 'company'
  `);
  const companyInfo: Record<string, string> = {};
  for (const row of contentResult.rows) {
    companyInfo[String(row.content_key)] = String(row.content_value);
  }

  const address =
    companyInfo.address ||
    "180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony, Hyderabad – 501505";
  const phone = companyInfo.phone || "+91 8317684883";
  const email = companyInfo.email || "info@shellbiotech.in";
  const udyam = companyInfo.udyam || "UDYAM-TS-09-0239914";

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
            <span className="eyebrow eyebrow-light">DIRECT COMMUNICATION</span>
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
              Contact &amp; Institutional Enquiries
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.1rem",
                maxWidth: "680px",
                lineHeight: 1.6,
              }}
            >
              Connect with Shell Biotech for pharmaceutical catalogue inquiries, hospital procurement agreements, and distribution coordination across Telangana.
            </p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.35fr",
                gap: "56px",
                alignItems: "flex-start",
              }}
              className="contact-split"
            >
              {/* Office Details & Verified Corporate Information */}
              <div>
                <span className="eyebrow">HEADQUARTERS</span>
                <h2 style={{ marginBottom: "20px" }}>SHELL BIOTECH</h2>
                <p style={{ marginBottom: "32px", fontSize: "1.025rem", lineHeight: 1.7 }}>
                  Our registered office coordinates pharmaceutical sourcing protocols, marketing representation, and institutional hospital delivery throughout Telangana.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "var(--color-secondary-tint)",
                        border: "1px solid var(--color-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-xs)",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1rem", marginBottom: "4px" }}>
                        Registered Administrative Office
                      </strong>
                      <span style={{ fontSize: "0.925rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                        {address}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "var(--color-secondary-tint)",
                        border: "1px solid var(--color-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-xs)",
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={20} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1rem", marginBottom: "4px" }}>
                        Direct Telephone
                      </strong>
                      <a
                        href={`tel:${phone}`}
                        style={{ fontSize: "0.95rem", color: "var(--color-secondary)", fontWeight: 700 }}
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "var(--color-secondary-tint)",
                        border: "1px solid var(--color-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-xs)",
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={20} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "1rem", marginBottom: "4px" }}>
                        Official Email
                      </strong>
                      <a
                        href={`mailto:${email}`}
                        style={{ fontSize: "0.95rem", color: "var(--color-secondary)", fontWeight: 600 }}
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administrative Registration Card */}
                <div
                  style={{
                    backgroundColor: "var(--color-bg-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    padding: "24px",
                  }}
                >
                  <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "var(--color-primary)" }}>
                    Corporate Credentials
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-text-subtle)" }}>Entity:</span>
                      <strong style={{ color: "var(--color-text)" }}>Shell Biotech (Partnership)</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-text-subtle)" }}>Registration:</span>
                      <span style={{ fontFamily: "monospace", color: "var(--color-text)" }}>{udyam}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--color-text-subtle)" }}>Operating Region:</span>
                      <span style={{ color: "var(--color-text)" }}>Telangana, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Enquiry Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
