import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import ProductsManagerClient from "./ProductsManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";
import { ProductItem } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();

  const prodResult = await db.execute(`
    SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured, created_at, updated_at
    FROM products
    ORDER BY id DESC
  `);
  const products = (prodResult.rows as unknown) as ProductItem[];

  const catResult = await db.execute("SELECT id, name, slug FROM categories ORDER BY name ASC");
  const categories = catResult.rows.map((c) => ({
    id: Number(c.id),
    name: String(c.name),
    slug: String(c.slug),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Product Catalogue Management
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Create, edit, publish, or remove pharmaceutical products in the catalogue.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <ProductsManagerClient initialProducts={products} categories={categories} />
        </div>
      </div>
    </>
  );
}
