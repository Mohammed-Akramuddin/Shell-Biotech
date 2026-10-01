import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import EnquiriesManagerClient from "./EnquiriesManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();
  const enquiriesResult = await db.execute("SELECT * FROM enquiries ORDER BY id DESC");
  const enquiries = enquiriesResult.rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    email: String(r.email),
    phone: String(r.phone),
    company: r.company ? String(r.company) : null,
    subject: String(r.subject),
    message: String(r.message),
    product_slug: r.product_slug ? String(r.product_slug) : null,
    product_name: r.product_name ? String(r.product_name) : null,
    status: String(r.status || "New"),
    created_at: String(r.created_at || ""),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Institutional Enquiries &amp; Messages
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Review product availability requests, hospital procurement enquiries, and territory contact messages.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <EnquiriesManagerClient initialEnquiries={enquiries} />
        </div>
      </div>
    </>
  );
}
