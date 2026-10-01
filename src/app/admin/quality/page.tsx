import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import QualityManagerClient from "./QualityManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminQualityPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();
  const docResult = await db.execute("SELECT * FROM quality_docs ORDER BY id ASC");
  const documents = docResult.rows.map((r) => ({
    id: Number(r.id),
    title: String(r.title),
    category: String(r.category),
    description: String(r.description || ""),
    file_url: String(r.file_url || "#"),
    status: String(r.status || "Verified"),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Quality &amp; Compliance Management
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Maintain verified partner audit standards, batch release records, and official certifications.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <QualityManagerClient initialDocs={documents} />
        </div>
      </div>
    </>
  );
}
