import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ProductCard, { ProductItem } from "@/components/ProductCard";
import TelanganaMap from "@/components/TelanganaMap";
import { getDb, initDb } from "@/lib/db";
import { ArrowRight, ShieldCheck, Truck, Users, Building2, Layers, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await initDb();
  const db = getDb();

  // Fetch featured products
  const productsResult = await db.execute(`
    SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured
    FROM products
    WHERE status = 'Published'
    ORDER BY is_featured DESC, id ASC
    LIMIT 3
  `);
  const products = (productsResult.rows as unknown) as ProductItem[];

  // Fetch site content
  const contentResult = await db.execute(`
    SELECT section, content_key, content_value FROM site_content WHERE section = 'home'
  `);
  const contentMap: Record<string, string> = {};
  for (const row of contentResult.rows) {
    contentMap[String(row.content_key)] = String(row.content_value);
  }

  const heroTitle = contentMap.hero_title || "Pharmaceutical Products.\nHealthcare Connections.";
  const heroSubtitle =
    contentMap.hero_subtitle ||
    "Shell Biotech bridges verified pharmaceutical manufacturing partners with healthcare institutions, hospital networks, and medical professionals across Telangana.";
  const whoWeAreTitle =
    contentMap.who_we_are_title || "A pharmaceutical partner focused on healthcare connections.";
  const whoWeAreText =
    contentMap.who_we_are_text ||
    "Established in 2013 and headquartered in Hyderabad, Shell Biotech operates as a pharmaceutical sourcing, marketing, and distribution organization. Working directly with licensed pharmaceutical manufacturers in other states, we bridge the gap between quality formulation supply and healthcare institutions across Telangana.";
  const ctaHeading = contentMap.cta_heading || "Looking for product information or institutional supply?";
  const ctaText =
    contentMap.cta_text ||
    "Connect with our sales and distribution team for catalogue availability, hospital procurement, and partnership inquiries.";

  return (
    <>
      <Navbar isHeroOverlay={true} />

      <main>
        {/* ========================================================
            1. FULL-BLEED HERO SECTION
            ======================================================== */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            paddingTop: "120px",
            paddingBottom: "80px",
            overflow: "hidden",
            backgroundColor: "#071421",
          }}
        >
          {/* Full-bleed background visual slider */}
          <HeroSlider />

          {/* Hero Typography Content */}
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ maxWidth: "840px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.825rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#8E9B90",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-secondary)",
                    display: "inline-block",
                  }}
                />
                SHELL BIOTECH • ESTABLISHED 2013 • HYDERABAD
              </span>

              <h1
                style={{
                  color: "#FFFFFF",
                  whiteSpace: "pre-line",
                  fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                }}
              >
                {heroTitle}
              </h1>

              <p
                style={{
                  color: "#B8C4CC",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  lineHeight: 1.65,
                  maxWidth: "680px",
                  marginBottom: "40px",
                }}
              >
                {heroSubtitle}
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/products" className="btn btn-secondary btn-lg">
                  Explore Products <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn btn-outline-light btn-lg">
                  Enquire
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. WHO WE ARE (EDITORIAL 2-COLUMN SECTION)
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                gap: "64px",
                alignItems: "center",
              }}
              className="editorial-grid"
            >
              {/* Image Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "420px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#F2F3F1",
                  borderRadius: "var(--radius-xs)",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "420px" }}>
                  <Image
                    src="/images/home/about.jpg"
                    alt="Shell Biotech Operating Paradigm"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "contain", padding: "16px" }}
                  />
                </div>
              </div>

              {/* Text Side */}
              <div>
                <span className="eyebrow">WHO WE ARE</span>
                <h2 style={{ marginBottom: "20px" }}>{whoWeAreTitle}</h2>
                <p style={{ marginBottom: "24px", fontSize: "1.05rem", lineHeight: 1.75 }}>
                  {whoWeAreText}
                </p>

                <div
                  style={{
                    padding: "16px",
                    borderLeft: "3px solid var(--color-secondary)",
                    backgroundColor: "var(--color-bg-alt)",
                    marginBottom: "32px",
                    fontSize: "0.9rem",
                    color: "var(--color-text)",
                  }}
                >
                  <strong>Transparent Operating Model:</strong> Shell Biotech functions through trusted partnerships with established third-party pharmaceutical manufacturers, managing product sourcing, regulatory verification, marketing, and institutional delivery across Telangana.
                </div>

                <Link href="/about" className="btn btn-outline">
                  Read About Company <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. WHAT WE DO (5 PILLARS TYPOGRAPHIC LAYOUT)
            ======================================================== */}
        <section className="section section-bg-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">CORE ACTIVITIES</span>
              <h2>What We Do</h2>
              <p>
                Our core operations span the entire distribution chain from partner facility procurement to hospital institutional supply.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1px",
                backgroundColor: "var(--color-border)",
                border: "1px solid var(--color-border)",
              }}
              className="activities-grid"
            >
              {[
                {
                  number: "01",
                  title: "Pharmaceutical Products",
                  desc: "Essential therapeutic formulations including antibiotics, haematinics, digestive enzymes, and nutritional supplements.",
                },
                {
                  number: "02",
                  title: "Product Sourcing",
                  desc: "Direct coordination with licensed manufacturing facilities located in other states, vetting batch documentation.",
                },
                {
                  number: "03",
                  title: "Sales & Marketing",
                  desc: "Dedicated field sales representation presenting verified product scientific specifications to medical practitioners.",
                },
                {
                  number: "04",
                  title: "Healthcare Supply",
                  desc: "Dependable order fulfilment, institutional inventory management, and structured batch traceability.",
                },
                {
                  number: "05",
                  title: "Hospital Network",
                  desc: "Long-term relationships with hospital pharmacies, nursing homes, and clinics across Telangana.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "36px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--color-secondary)",
                      lineHeight: 1,
                      marginBottom: "20px",
                    }}
                  >
                    {item.number}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      marginBottom: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. SELECTED PRODUCTS
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div style={{ marginBottom: "40px" }}>
              <span className="eyebrow">PORTFOLIO</span>
              <h2>Our Products</h2>
              <p style={{ marginTop: "8px", maxWidth: "680px" }}>
                Selected pharmaceutical formulations supplied to healthcare institutions across Telangana.
              </p>
            </div>

            <div className="grid-3" style={{ marginBottom: "40px" }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/products" className="btn btn-primary btn-lg">
                View Full Product Catalogue <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. OUR APPROACH (OPERATING MODEL FLOW)
            ======================================================== */}
        <section className="section section-dark">
          <div className="container">
            <div className="section-header text-center">
              <span className="eyebrow eyebrow-light">TRANSPARENT DISTRIBUTION</span>
              <h2 style={{ color: "#FFFFFF" }}>Our Approach</h2>
              <p style={{ color: "#B8C4CC" }}>
                Shell Biotech operates through a structured 4-stage distribution model, connecting licensed manufacturing partners with healthcare institutions.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
                position: "relative",
              }}
              className="approach-grid"
            >
              {[
                {
                  step: "01",
                  label: "MANUFACTURING PARTNERS",
                  sub: "Out-of-State Facilities",
                  desc: "Products are sourced from licensed third-party pharmaceutical manufacturing facilities complying with statutory regulatory standards.",
                },
                {
                  step: "02",
                  label: "SHELL BIOTECH",
                  sub: "Hyderabad Central Hub",
                  desc: "Shell Biotech oversees sourcing oversight, commercial marketing, inventory management, and batch documentation.",
                },
                {
                  step: "03",
                  label: "SALES REPRESENTATIVES",
                  sub: "Field Professional Team",
                  desc: "Trained medical representatives present verified product specifications directly to doctors, clinics, and pharmacies.",
                },
                {
                  step: "04",
                  label: "HOSPITALS & INSTITUTIONS",
                  sub: "Point of Care Delivery",
                  desc: "Reliable institutional supply to hospital pharmacies, healthcare institutions, and nursing homes across Telangana.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "var(--radius-xs)",
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        color: "#496B5A",
                      }}
                    >
                      {item.step}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#8E9B90",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.sub}
                    </span>
                  </div>

                  <h3
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "12px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.label}
                  </h3>

                  <p style={{ color: "#B8C4CC", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "48px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(11, 31, 51, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(73, 107, 90, 0.3)",
                  border: "1px solid #496B5A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Building2 size={20} color="#8E9B90" />
              </div>
              <p style={{ fontSize: "0.875rem", color: "#B8C4CC", margin: 0 }}>
                <strong style={{ color: "#FFFFFF" }}>Operational Clarification:</strong> Shell Biotech does not own pharmaceutical manufacturing plants. Our corporate focus is pharmaceutical sourcing, regulatory verification, marketing representation, and institutional hospital distribution.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. OUR PRESENCE (TELANGANA GRAPHIC MAP SECTION)
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <TelanganaMap />
          </div>
        </section>

        {/* ========================================================
            7. QUALITY & COMPLIANCE PREVIEW
            ======================================================== */}
        <section className="section section-bg-alt">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "48px",
                alignItems: "center",
              }}
              className="editorial-grid"
            >
              <div>
                <span className="eyebrow">QUALITY &amp; COMPLIANCE</span>
                <h2 style={{ marginBottom: "20px" }}>
                  A disciplined approach to pharmaceutical sourcing standards.
                </h2>
                <p style={{ marginBottom: "20px" }}>
                  Quality and compliance are central to Shell Biotech&apos;s pharmaceutical sourcing and supply approach. We partner strictly with approved manufacturing units that adhere to statutory Indian pharmacopeial standards and maintain verified batch documentation.
                </p>

                <div className="notice-box" style={{ marginBottom: "28px" }}>
                  <strong>Regulatory Transparency Notice:</strong> Official certification and regulatory documentation will be published following official administrative verification.
                </div>

                <Link href="/quality" className="btn btn-outline">
                  Learn More About Quality <ArrowRight size={16} />
                </Link>
              </div>

              {/* Quality Checklist Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xs)",
                  padding: "36px",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", marginBottom: "20px", color: "var(--color-primary)" }}>
                  Compliance Commitments
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    "Partner facility license verification prior to procurement",
                    "Certificate of Analysis (COA) verification per product batch",
                    "Batch tracking and expiry date monitoring for hospital supply",
                    "Strict temperature-controlled transport for sensitive liquid formulations",
                    "Continuous engagement with healthcare institutional pharmacovigilance",
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.9rem", color: "var(--color-text)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. FACTUAL COMPANY SNAPSHOT
            ======================================================== */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="eyebrow">FACTUAL RECORD</span>
              <h2>Company Snapshot</h2>
              <p>Confirmed corporate facts and administrative registration.</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
              }}
              className="snapshot-grid"
            >
              {[
                { label: "ESTABLISHED", val: "2013", sub: "Incorporated Partnership" },
                { label: "BUSINESS STRUCTURE", val: "Partnership", sub: "Registered Entity" },
                { label: "OPERATING REGION", val: "Telangana, India", sub: "Hospital & Institutional Network" },
                { label: "REGISTERED OFFICE", val: "Hyderabad", sub: "501505, Telangana" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-bg-alt)",
                    padding: "32px 24px",
                    textAlign: "center",
                    borderRadius: "var(--radius-xs)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.725rem",
                      color: "var(--color-secondary)",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    {item.label}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "var(--color-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    {item.val}
                  </div>
                  <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            9. ENQUIRY CTA SECTION
            ======================================================== */}
        <section
          className="section"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
            borderTop: "1px solid var(--color-primary-light)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <span className="eyebrow eyebrow-light">CONNECT WITH US</span>
            <h2 style={{ color: "#FFFFFF", marginBottom: "16px", maxWidth: "720px", marginLeft: "auto", marginRight: "auto" }}>
              {ctaHeading}
            </h2>
            <p
              style={{
                color: "#B8C4CC",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "36px",
                fontSize: "1.05rem",
              }}
            >
              {ctaText}
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                Send an Enquiry <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-outline-light btn-lg">
                Contact Registered Office
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
