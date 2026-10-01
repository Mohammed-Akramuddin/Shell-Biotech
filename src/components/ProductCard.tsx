import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare } from "lucide-react";

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  category_name: string;
  dosage_form: string;
  composition?: string | null;
  strength?: string | null;
  pack_size?: string | null;
  description?: string | null;
  image: string;
  status?: string;
  is_featured?: number;
}

interface ProductCardProps {
  product: ProductItem;
  onEnquire?: (product: ProductItem) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.slug}`}
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "90%",
          backgroundColor: "#F7FAF8",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
          display: "block",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain", padding: "16px" }}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
          }}
        >
          <span className="badge badge-secondary">{product.category_name}</span>
        </div>
      </Link>

      {/* Content Area */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-secondary)",
              fontWeight: 700,
            }}
          >
            {product.dosage_form}
          </span>
          <h3
            style={{
              fontSize: "1.25rem",
              marginTop: "4px",
              marginBottom: "8px",
              fontWeight: 800,
            }}
          >
            <Link href={`/products/${product.slug}`} className="product-card-title">
              {product.name}
            </Link>
          </h3>
        </div>

        {product.composition && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              marginBottom: "12px",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.composition}
          </p>
        )}

        {product.strength && (
          <div
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: "1px solid var(--color-border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.8rem",
            }}
          >
            <span style={{ color: "var(--color-text-subtle)", fontWeight: 500 }}>Strength:</span>
            <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>{product.strength}</span>
          </div>
        )}

        {/* Action Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-outline btn-sm"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="btn btn-subtle btn-sm"
            title={`Enquire about ${product.name}`}
            style={{ padding: "8px 12px" }}
          >
            <MessageSquare size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
