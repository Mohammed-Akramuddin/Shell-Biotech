import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import CategoriesManagerClient from "./CategoriesManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();
  const catResult = await db.execute("SELECT id, name, slug FROM categories ORDER BY id ASC");
  const categories = catResult.rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    slug: String(r.slug),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Category Management
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Manage dosage form categories used across the catalogue filter system.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <CategoriesManagerClient initialCategories={categories} />
        </div>
      </div>
    </>
  );
}
