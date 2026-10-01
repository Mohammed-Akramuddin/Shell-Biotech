"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Home,
  Building2,
  ShieldCheck,
  MapPin,
  Briefcase,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Homepage", href: "/admin/homepage", icon: Home },
    { label: "Company Info", href: "/admin/company", icon: Building2 },
    { label: "Quality & Compliance", href: "/admin/quality", icon: ShieldCheck },
    { label: "Network", href: "/admin/network", icon: MapPin },
    { label: "Careers & Apps", href: "/admin/careers", icon: Briefcase },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "32px",
            height: "32px",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/branding/Screenshot 2026-07-22 123557.png"
            alt="Shell Biotech Logo"
            fill
            sizes="32px"
            style={{ objectFit: "contain", padding: "1px" }}
          />
        </div>
        <div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "0.08em",
              display: "block",
              color: "#FFFFFF",
            }}
          >
            SHELL BIOTECH
          </span>
          <span style={{ fontSize: "0.65rem", color: "#8E9B90", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Admin Management
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav
        style={{
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#FFFFFF" : "#B8C4CC",
                backgroundColor: isActive ? "rgba(73, 107, 90, 0.35)" : "transparent",
                borderLeft: isActive ? "3px solid #496B5A" : "3px solid transparent",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#B8C4CC";
                }
              }}
            >
              <Icon size={18} color={isActive ? "#FFFFFF" : "#8E9B90"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            color: "#8E9B90",
            padding: "8px 10px",
            borderRadius: "var(--radius-xs)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8E9B90")}
        >
          <span>View Public Site</span>
          <ExternalLink size={14} />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            background: "none",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#E27D60",
            padding: "10px 12px",
            borderRadius: "var(--radius-xs)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(226, 125, 96, 0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
