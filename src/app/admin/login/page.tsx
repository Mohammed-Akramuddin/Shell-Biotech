"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#071421",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xs)",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Brand Header: Clickable logo & Shell Biotech title to navigate back to Home */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              marginBottom: "12px",
            }}
            title="Click to return to Shell Biotech Home"
          >
            <div
              style={{
                position: "relative",
                width: "44px",
                height: "44px",
                flexShrink: 0,
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
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
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  letterSpacing: "0.1em",
                  color: "#0B1F33",
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
                  color: "#496B5A",
                  textTransform: "uppercase",
                }}
              >
                Pharmaceuticals
              </span>
            </div>
          </Link>
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-subtle)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Authorized Administrative Portal
            </span>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "var(--color-error-bg)",
              border: "1px solid #F3CACA",
              color: "var(--color-error)",
              padding: "12px 14px",
              borderRadius: "var(--radius-xs)",
              marginBottom: "20px",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Administrative Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="var(--color-text-subtle)"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="off"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shellbiotech.in"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Security Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                color="var(--color-text-subtle)"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: "8px" }}
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.825rem",
              color: "var(--color-text-subtle)",
              textDecoration: "underline",
            }}
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
