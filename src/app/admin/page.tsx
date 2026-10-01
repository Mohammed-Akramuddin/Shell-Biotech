import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";
import {
  Package,
  CheckCircle,
  FileEdit,
  MessageSquare,
  Briefcase,
  Users,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();

  // Real database metrics
  const totalProdRes = await db.execute("SELECT COUNT(*) as count FROM products");
  const pubProdRes = await db.execute("SELECT COUNT(*) as count FROM products WHERE status = 'Published'");
  const draftProdRes = await db.execute("SELECT COUNT(*) as count FROM products WHERE status = 'Draft'");
  const newEnqRes = await db.execute("SELECT COUNT(*) as count FROM enquiries WHERE status = 'New'");
  const totalEnqRes = await db.execute("SELECT COUNT(*) as count FROM enquiries");
  const openJobsRes = await db.execute("SELECT COUNT(*) as count FROM jobs WHERE status = 'Active'");
  const appsRes = await db.execute("SELECT COUNT(*) as count FROM job_applications");

  // Recent enquiries
  const recentEnqRes = await db.execute(`
    SELECT id, name, email, phone, company, subject, status, created_at
    FROM enquiries
    ORDER BY id DESC
    LIMIT 5
  `);

  // Recent products
  const recentProdRes = await db.execute(`
    SELECT id, name, slug, category_name, dosage_form, strength, status, updated_at
    FROM products
    ORDER BY id DESC
    LIMIT 5
  `);

  return (
    <>
      <AdminSidebar />

      <div className="admin-content">
        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Admin Dashboard Overview
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Shell Biotech Management System • Logged in as <strong>{session.email}</strong>
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/admin/products" className="btn btn-primary btn-sm">
              Manage Products
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main">
          {/* Key Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "32px",
            }}
            className="stats-grid"
          >
            {/* Total Products */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-subtle)" }}>
                  Total Products
                </span>
                <Package size={20} color="var(--color-primary)" />
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {Number(totalProdRes.rows[0].count)}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-secondary)", marginTop: "6px" }}>
                {Number(pubProdRes.rows[0].count)} Published • {Number(draftProdRes.rows[0].count)} Draft
              </div>
            </div>

            {/* New Enquiries */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-subtle)" }}>
                  New Enquiries
                </span>
                <MessageSquare size={20} color="var(--color-secondary)" />
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--color-secondary)" }}>
                {Number(newEnqRes.rows[0].count)}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "6px" }}>
                Total received: {Number(totalEnqRes.rows[0].count)}
              </div>
            </div>

            {/* Open Positions */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-subtle)" }}>
                  Active Job Openings
                </span>
                <Briefcase size={20} color="var(--color-primary)" />
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {Number(openJobsRes.rows[0].count)}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "6px" }}>
                Telangana territory &amp; internships
              </div>
            </div>

            {/* Applications */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-subtle)" }}>
                  Job Applications
                </span>
                <Users size={20} color="var(--color-secondary)" />
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--color-secondary)" }}>
                {Number(appsRes.rows[0].count)}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "6px" }}>
                Candidate submissions
              </div>
            </div>
          </div>

          {/* Tables Row: Recent Enquiries & Recent Products */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="admin-split-grid">
            {/* Recent Enquiries */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary)" }}>
                  Recent Enquiries
                </h3>
                <Link href="/admin/enquiries" style={{ fontSize: "0.825rem", color: "var(--color-secondary)", fontWeight: 600 }}>
                  View All →
                </Link>
              </div>

              {recentEnqRes.rows.length > 0 ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnqRes.rows.map((enq) => (
                        <tr key={Number(enq.id)}>
                          <td>
                            <strong>{String(enq.name)}</strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                              {String(enq.email)}
                            </div>
                          </td>
                          <td style={{ fontSize: "0.825rem" }}>{String(enq.subject)}</td>
                          <td>
                            <span
                              className={`badge ${
                                enq.status === "New"
                                  ? "badge-warning"
                                  : enq.status === "Contacted"
                                  ? "badge-primary"
                                  : "badge-success"
                              }`}
                            >
                              {String(enq.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>No enquiries received yet.</p>
              )}
            </div>

            {/* Recent Products */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xs)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary)" }}>
                  Product Portfolio
                </h3>
                <Link href="/admin/products" style={{ fontSize: "0.825rem", color: "var(--color-secondary)", fontWeight: 600 }}>
                  Manage Products →
                </Link>
              </div>

              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProdRes.rows.map((p) => (
                      <tr key={Number(p.id)}>
                        <td>
                          <strong>{String(p.name)}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                            {String(p.dosage_form)}
                          </div>
                        </td>
                        <td>{String(p.category_name)}</td>
                        <td>
                          <span
                            className={`badge ${
                              p.status === "Published" ? "badge-success" : "badge-outline"
                            }`}
                          >
                            {String(p.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
