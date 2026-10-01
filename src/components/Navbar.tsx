"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  isHeroOverlay?: boolean;
}

export default function Navbar({ isHeroOverlay = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const showDarkBg = !isHome || scrolled || !isHeroOverlay;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Company", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Quality & Compliance", href: "/quality" },
    { name: "Our Network", href: "/network" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: showDarkBg ? "rgba(11, 31, 51, 0.96)" : "transparent",
          backdropFilter: showDarkBg ? "blur(8px)" : "none",
          borderBottom: showDarkBg
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(255, 255, 255, 0.08)",
          transition: "background-color 0.25s ease, border-color 0.25s ease, padding 0.25s ease",
          padding: scrolled ? "12px 0" : "18px 0",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo with image */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }} aria-label="Shell Biotech Home">
            <div
              style={{
                position: "relative",
                width: "44px",
                height: "44px",
                flexShrink: 0,
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Image
                src="/images/branding/Screenshot 2026-07-22 123557.png"
                alt="Shell Biotech Logo"
                fill
                sizes="44px"
                style={{ objectFit: "contain", padding: "2px" }}
                priority
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  letterSpacing: "0.1em",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                SHELL BIOTECH
              </span>
              <span
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                  color: "#8E9B90",
                  textTransform: "uppercase",
                }}
              >
                Pharmaceuticals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
                    borderBottom: active ? "2px solid #496B5A" : "2px solid transparent",
                    paddingBottom: "4px",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = "rgba(255, 255, 255, 0.78)";
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Enquire (prominent) & Login (understated) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
            className="nav-actions"
          >
            <Link
              href="/contact"
              className="btn btn-secondary btn-sm"
              style={{ padding: "8px 18px", fontSize: "0.85rem", letterSpacing: "0.02em" }}
            >
              Enquire <ArrowRight size={14} />
            </Link>

            {/* Discreet login link */}
            <Link
              href="/admin/login"
              style={{
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.45)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.45)")}
              title="Portal Login"
            >
              Login
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle mobile menu"
              style={{
                background: "transparent",
                border: "none",
                color: "#FFFFFF",
                cursor: "pointer",
                padding: "6px",
                display: "none",
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0B1F33",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "88px 24px 36px 24px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  color: pathname === link.href ? "#FFFFFF" : "#B8C4CC",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingBottom: "14px",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "auto" }}>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Enquire <ArrowRight size={16} />
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.45)",
                fontSize: "0.85rem",
                padding: "10px",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
