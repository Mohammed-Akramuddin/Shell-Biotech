"use client";

import React, { useState, useMemo } from "react";
import ProductCard, { ProductItem } from "@/components/ProductCard";
import { Search, Filter, X, Package } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface ProductCatalogClientProps {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}

export default function ProductCatalogClient({
  initialProducts,
  categories,
}: ProductCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category_name.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.composition && product.composition.toLowerCase().includes(query)) ||
        (product.dosage_form && product.dosage_form.toLowerCase().includes(query)) ||
        (product.strength && product.strength.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Control Bar: Search and Category Tabs */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "24px",
          marginBottom: "40px",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr",
            gap: "20px",
            alignItems: "center",
          }}
          className="catalog-controls-grid"
        >
          {/* Search Box */}
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              color="var(--color-text-subtle)"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search by product name, generic active formula, strength..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "42px", paddingRight: searchQuery ? "40px" : "14px" }}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-subtle)",
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills / Buttons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            className="category-buttons"
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-subtle)",
                marginRight: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Filter size={14} /> Category:
            </span>

            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`btn btn-sm ${
                selectedCategory === "All" ? "btn-primary" : "btn-subtle"
              }`}
              style={{ padding: "6px 14px", fontSize: "0.825rem" }}
            >
              All Formulations ({initialProducts.length})
            </button>

            {categories.map((cat) => {
              const count = initialProducts.filter(
                (p) => p.category_name.toLowerCase() === cat.name.toLowerCase()
              ).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`btn btn-sm ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "btn-primary"
                      : "btn-subtle"
                  }`}
                  style={{ padding: "6px 14px", fontSize: "0.825rem" }}
                >
                  {cat.name} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--color-border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
          }}
        >
          <div>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{initialProducts.length}</strong> verified formulations
            {selectedCategory !== "All" && <span> in <strong>{selectedCategory}</strong></span>}
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
          </div>

          {(selectedCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-secondary)",
                fontWeight: 600,
                fontSize: "0.825rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid-3" style={{ marginBottom: "64px" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xs)",
            padding: "64px 24px",
            textAlign: "center",
            marginBottom: "64px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "var(--color-bg-alt)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "var(--color-text-subtle)",
            }}
          >
            <Package size={28} />
          </div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>No Formulations Found</h3>
          <p style={{ maxWidth: "480px", margin: "0 auto 20px auto" }}>
            No pharmaceutical products matched your query. Try adjusting your search term or select another category.
          </p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Clear Search &amp; Show All Products
          </button>
        </div>
      )}
    </div>
  );
}
