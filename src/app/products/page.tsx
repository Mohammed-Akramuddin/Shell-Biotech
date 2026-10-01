import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalogClient from "./ProductCatalogClient";
import { getDb, initDb } from "@/lib/db";
import { ProductItem } from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalogue | Verified Pharmaceutical Formulations",
  description:
    "Explore Shell Biotech's pharmaceutical portfolio of tablets, syrups, suspensions, drops, and softgel formulations for healthcare networks and hospitals in Telangana.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await initDb();
  const db = getDb();

  // Fetch all published products
  const productsResult = await db.execute(`
    SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured
    FROM products
    WHERE status = 'Published'
    ORDER BY name ASC
  `);
  const products = (productsResult.rows as unknown) as ProductItem[];

  // Fetch categories
  const categoriesResult = await db.execute(`
    SELECT id, name, slug FROM categories ORDER BY name ASC
  `);
  const categories = categoriesResult.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    slug: String(row.slug),
  }));

  return (
    <>
      <Navbar isHeroOverlay={false} />

      <main style={{ paddingTop: "88px" }}>
        {/* Page Header */}
        <section
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
            paddingTop: "64px",
            paddingBottom: "64px",
            borderBottom: "1px solid var(--color-primary-light)",
          }}
        >
          <div className="container">
            <span className="eyebrow eyebrow-light">FORMULATION PORTFOLIO</span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)",
                fontWeight: 800,
                maxWidth: "800px",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Pharmaceutical Product Catalogue
            </h1>
            <p
              style={{
                color: "#B8C4CC",
                fontSize: "1.1rem",
                maxWidth: "680px",
                lineHeight: 1.6,
              }}
            >
              Verified therapeutic formulations sourced from licensed partner manufacturing facilities for hospital supply and clinical practice across Telangana.
            </p>
          </div>
        </section>

        {/* Product Catalog Interface */}
        <section className="section" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="container">
            <ProductCatalogClient initialProducts={products} categories={categories} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
