import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { ProductItem } from "@/components/ProductCard";
import { getDb, initDb } from "@/lib/db";
import { ArrowLeft, MessageSquare, ShieldCheck, Building2, Package, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await initDb();
  const db = getDb();
  const { slug } = await params;

  const result = await db.execute({
    sql: "SELECT name, composition, dosage_form FROM products WHERE slug = ?",
    args: [slug],
  });

  if (result.rows.length === 0) {
    return { title: "Product Not Found | Shell Biotech" };
  }

  const p = result.rows[0];
  return {
    title: `${String(p.name)} (${String(p.dosage_form)}) | Shell Biotech`,
    description: `Product details for ${String(p.name)}, ${String(p.dosage_form)} containing ${String(p.composition || "")}. Supplied to healthcare institutions by Shell Biotech.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  await initDb();
  const db = getDb();
  const { slug } = await params;

  const productResult = await db.execute({
    sql: `SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured
          FROM products WHERE slug = ?`,
    args: [slug],
  });

  if (productResult.rows.length === 0) {
    notFound();
  }

  const product = (productResult.rows[0] as unknown) as ProductItem;

  // Fetch related products in the same category or general formulations
  const relatedResult = await db.execute({
    sql: `SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status
          FROM products
          WHERE slug != ? AND (category_name = ? OR status = 'Published')
          LIMIT 3`,
    args: [slug, product.category_name],
  });
  const relatedProducts = (relatedResult.rows as unknown) as ProductItem[];

  return (
    <>
      <Navbar isHeroOverlay={false} />

      <main style={{ paddingTop: "88px" }}>
        {/* Breadcrumb Bar */}
        <div
          style={{
            backgroundColor: "var(--color-bg-alt)",
            borderBottom: "1px solid var(--color-border)",
            padding: "16px 0",
          }}
        >
          <div className="container" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
            <Link
              href="/products"
              style={{
                color: "var(--color-secondary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={16} /> Back to Product Catalogue
            </Link>
            <span style={{ color: "var(--color-border)" }}>/</span>
            <span style={{ color: "var(--color-text-subtle)" }}>{product.category_name}</span>
            <span style={{ color: "var(--color-border)" }}>/</span>
            <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>{product.name}</span>
          </div>
        </div>

        {/* Main Product Layout */}
        <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.25fr",
                gap: "56px",
                alignItems: "flex-start",
              }}
              className="product-detail-grid"
            >
              {/* Product Visual Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xs)",
                  backgroundColor: "#F7FAF8",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  style={{ objectFit: "contain", padding: "32px" }}
                />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span className="badge badge-secondary">{product.category_name}</span>
                </div>
              </div>

              {/* Product Data Hierarchy */}
              <div>
                <span className="eyebrow">{product.dosage_form}</span>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    marginBottom: "12px",
                    fontWeight: 800,
                  }}
                >
                  {product.name}
                </h1>

                {product.composition && (
                  <div
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "var(--color-secondary)",
                      marginBottom: "24px",
                      lineHeight: 1.4,
                    }}
                  >
                    {product.composition}
                  </div>
                )}

                {/* Technical Specifications Table */}
                <div
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-xs)",
                    overflow: "hidden",
                    marginBottom: "28px",
                  }}
                >
                  <table className="table" style={{ margin: 0 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "35%", fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                          Generic Formulation
                        </td>
                        <td>{product.composition || "Pharmacopeial specification"}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                          Dosage Form
                        </td>
                        <td>{product.dosage_form}</td>
                      </tr>
                      {product.strength && (
                        <tr>
                          <td style={{ fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                            Verified Strength
                          </td>
                          <td>
                            <strong>{product.strength}</strong>
                          </td>
                        </tr>
                      )}
                      {product.pack_size && (
                        <tr>
                          <td style={{ fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                            Packaging Specification
                          </td>
                          <td>{product.pack_size}</td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                          Sourcing Method
                        </td>
                        <td>Partner Pharmaceutical Manufacturing Facilities</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700, backgroundColor: "var(--color-bg-alt)", color: "var(--color-primary)" }}>
                          Distribution Territory
                        </td>
                        <td>Telangana, India</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Description */}
                {product.description && (
                  <div style={{ marginBottom: "32px" }}>
                    <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "var(--color-primary)" }}>
                      Product Overview
                    </h4>
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Statutory Regulatory Notice */}
                <div className="notice-box" style={{ marginBottom: "32px" }}>
                  <strong>Product Compliance Notice:</strong> Sourced strictly from licensed third-party pharmaceutical manufacturers. For institutional healthcare procurement and clinical inquiries only. Does not constitute consumer self-medication guidance.
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="btn btn-primary btn-lg"
                    style={{ gap: "10px" }}
                  >
                    <MessageSquare size={18} />
                    <span>Enquire About This Product</span>
                  </Link>

                  <Link href="/products" className="btn btn-outline btn-lg">
                    Return to Catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="section section-bg-alt">
            <div className="container">
              <div className="section-header">
                <span className="eyebrow">PORTFOLIO</span>
                <h2>Related Formulations</h2>
                <p>Additional pharmaceutical products available for hospital and institutional supply.</p>
              </div>

              <div className="grid-3">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
