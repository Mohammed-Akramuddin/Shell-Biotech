import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import HomepageContentClient from "./HomepageContentClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();
  const contentResult = await db.execute("SELECT content_key, content_value FROM site_content WHERE section = 'home'");
  const contentMap: Record<string, string> = {};
  for (const row of contentResult.rows) {
    contentMap[String(row.content_key)] = String(row.content_value);
  }

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Homepage Content Editor
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Update public hero headlines, editorial texts, and call to action sections without touching code.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <HomepageContentClient initialContent={contentMap} />
        </div>
      </div>
    </>
  );
}
