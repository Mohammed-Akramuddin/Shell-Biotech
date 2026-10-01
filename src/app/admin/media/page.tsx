import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import MediaManagerClient from "./MediaManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();
  const mediaResult = await db.execute("SELECT * FROM media ORDER BY id DESC");
  const media = mediaResult.rows.map((r) => ({
    id: Number(r.id),
    filename: String(r.filename),
    file_url: String(r.file_url),
    file_type: String(r.file_type),
    size_bytes: Number(r.size_bytes || 0),
    created_at: String(r.created_at || ""),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Media &amp; Document Management
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Upload product packaging renders, corporate photography, and compliance certificates.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <MediaManagerClient initialMedia={media} />
        </div>
      </div>
    </>
  );
}
