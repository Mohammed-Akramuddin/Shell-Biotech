import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";

interface TelanganaMapProps {
  showFullDetails?: boolean;
}

export default function TelanganaMap({ showFullDetails = false }: TelanganaMapProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: showFullDetails ? "1.2fr 1fr" : "1fr 1fr",
        gap: "48px",
        alignItems: "center",
      }}
      className="telangana-grid"
    >
      {/* Visual Map Render */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "480px",
          border: "1px solid var(--color-border)",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xs)",
          overflow: "hidden",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "480px" }}>
          <Image
            src="/images/network/telangana-map.svg"
            alt="Telangana State Healthcare Distribution Network"
            fill
            style={{ objectFit: "contain", padding: "12px" }}
            priority
          />
        </div>
      </div>

      {/* Editorial Content */}
      <div>
        <span className="eyebrow">Operating Geography</span>
        <h2 style={{ marginBottom: "20px" }}>
          Serving healthcare networks across Telangana.
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Headquartered in Hyderabad, Shell Biotech deploys a structured pharmaceutical sales representation and distribution framework connecting partner manufacturing facilities to hospitals, clinics, and medical practitioners across Telangana state.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <MapPin size={20} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "0.95rem" }}>
                Central Administrative &amp; Distribution Hub
              </strong>
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                Kuntloor, Sunrise Colony, Hyderabad – 501505
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <CheckCircle2 size={20} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "0.95rem" }}>
                Institutional Supply Channel
              </strong>
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                Reliable product access for hospital pharmacies and medical institutions
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <CheckCircle2 size={20} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ display: "block", color: "var(--color-primary)", fontSize: "0.95rem" }}>
                Field Sales Representation
              </strong>
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                Direct clinical representation and healthcare provider communication
              </span>
            </div>
          </div>
        </div>

        {/* Connected Regional Distribution Hubs */}
        <div style={{ marginBottom: "28px", paddingTop: "18px", borderTop: "1px solid var(--color-border)" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--color-primary)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Connected Distribution Corridors
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { name: "Hyderabad (HQ)", isHq: true },
              { name: "Warangal", isHq: false },
              { name: "Karimnagar", isHq: false },
              { name: "Siddipet", isHq: false },
              { name: "Nizamabad", isHq: false },
              { name: "Khammam", isHq: false },
              { name: "Nalgonda", isHq: false },
              { name: "Mahabubnagar", isHq: false },
              { name: "Ramagundam", isHq: false },
              { name: "Adilabad", isHq: false },
            ].map((hub) => (
              <span
                key={hub.name}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: hub.isHq ? 800 : 600,
                  backgroundColor: hub.isHq ? "#0B1F33" : "#F2F7F4",
                  color: hub.isHq ? "#FFFFFF" : "#2C5E47",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: hub.isHq ? "1px solid #0B1F33" : "1px solid #D1DCD5",
                }}
              >
                {hub.name}
              </span>
            ))}
          </div>
        </div>

        {!showFullDetails && (
          <Link href="/network" className="btn btn-primary">
            Explore Our Network <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
