import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar isHeroOverlay={false} />

      <main
        style={{
          paddingTop: "140px",
          paddingBottom: "100px",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "6rem",
              fontWeight: 800,
              color: "var(--color-primary)",
              lineHeight: 1,
              display: "block",
              marginBottom: "12px",
            }}
          >
            404
          </span>

          <h1 style={{ fontSize: "1.75rem", marginBottom: "16px" }}>Page Not Found</h1>

          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", marginBottom: "32px", lineHeight: 1.6 }}>
            The requested page or pharmaceutical product could not be located. The link may have changed, or the formulation may have been moved.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              <Home size={16} /> Return to Homepage
            </Link>
            <Link href="/products" className="btn btn-outline">
              <Package size={16} /> View Product Catalogue
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
