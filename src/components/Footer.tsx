import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#071421",
        color: "#FFFFFF",
        borderTop: "1px solid #16324F",
        paddingTop: "72px",
        paddingBottom: "36px",
      }}
    >
      <div className="container">
        {/* Main 4-column corporate layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Company Profile */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  backgroundColor: "#FFFFFF",
                  flexShrink: 0,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image
                  src="/images/branding/Screenshot 2026-07-22 123557.png"
                  alt="Shell Biotech Logo"
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain", padding: "2px" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  letterSpacing: "0.12em",
                  color: "#FFFFFF",
                }}
              >
                SHELL BIOTECH
              </span>
            </div>
            <p style={{ color: "#B8C4CC", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Pharmaceutical products. Healthcare connections.
            </p>
            <p style={{ color: "#7E878C", fontSize: "0.85rem", lineHeight: 1.6 }}>
              A pharmaceutical sourcing, marketing, and distribution partnership connecting quality manufacturing partners to healthcare institutions across Telangana.
            </p>

            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.75rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Corporate Registration
              </span>
              <span style={{ fontSize: "0.825rem", color: "#B8C4CC", fontFamily: "monospace" }}>
                UDYAM-TS-09-0239914
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h6
              style={{
                color: "#FFFFFF",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                marginBottom: "20px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
              }}
            >
              Navigation
            </h6>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", padding: 0 }}>
              {[
                { name: "About Company", href: "/about" },
                { name: "Product Catalogue", href: "/products" },
                { name: "Quality & Compliance", href: "/quality" },
                { name: "Our Network", href: "/network" },
                { name: "Careers & Internships", href: "/careers" },
                { name: "Contact / Enquiry", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="footer-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Facts */}
          <div>
            <h6
              style={{
                color: "#FFFFFF",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                marginBottom: "20px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
              }}
            >
              Corporate Facts
            </h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Established
                </span>
                <span style={{ fontSize: "0.9rem", color: "#FFFFFF", fontWeight: 600 }}>2013</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Business Structure
                </span>
                <span style={{ fontSize: "0.9rem", color: "#FFFFFF", fontWeight: 600 }}>Partnership</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Operating Region
                </span>
                <span style={{ fontSize: "0.9rem", color: "#FFFFFF", fontWeight: 600 }}>Telangana, India</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Operating Model
                </span>
                <span style={{ fontSize: "0.82rem", color: "#B8C4CC" }}>
                  Sourcing via Licensed Manufacturing Partners
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Registered Office */}
          <div>
            <h6
              style={{
                color: "#FFFFFF",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                marginBottom: "20px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
              }}
            >
              Registered Office
            </h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: "#B8C4CC", fontSize: "0.875rem" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={18} color="#496B5A" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span>
                  180/5/P, Road No. 03, Ground Floor,<br />
                  Kuntloor, Sunrise Colony,<br />
                  Hyderabad – 501505, Telangana
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={18} color="#496B5A" style={{ flexShrink: 0 }} />
                <a href="tel:+918317684883" className="footer-contact-link" style={{ fontWeight: 600 }}>
                  +91 8317684883
                </a>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Mail size={18} color="#496B5A" style={{ flexShrink: 0 }} />
                <a href="mailto:info@shellbiotech.in" className="footer-contact-link">
                  info@shellbiotech.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #142B42",
            paddingTop: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.825rem",
            color: "#7E878C",
          }}
        >
          <div>
            © 2026 SHELL BIOTECH. All rights reserved. Sourced via partner pharmaceutical manufacturing facilities.
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/admin/login" style={{ color: "#496B5A", fontSize: "0.78rem" }}>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
