"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/components/ProductCard";
import { Plus, Edit2, Trash2, CheckCircle2, Eye, EyeOff, Search, AlertCircle, X } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}

export default function ProductsManagerClient({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_name: categories.length > 0 ? categories[0].name : "Tablets",
    dosage_form: "",
    composition: "",
    strength: "",
    pack_size: "",
    description: "",
    image: "/images/products/newpod-100.svg",
    status: "Published",
    is_featured: false,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      category_name: categories.length > 0 ? categories[0].name : "Tablets",
      dosage_form: "",
      composition: "",
      strength: "",
      pack_size: "",
      description: "",
      image: "/images/products/newpod-100.svg",
      status: "Published",
      is_featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      category_name: p.category_name,
      dosage_form: p.dosage_form,
      composition: p.composition || "",
      strength: p.strength || "",
      pack_size: p.pack_size || "",
      description: p.description || "",
      image: p.image || "/images/products/newpod-100.svg",
      status: p.status || "Published",
      is_featured: Boolean(p.is_featured),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed.");

      setMessage({
        type: "success",
        text: editingProduct ? "Product updated successfully." : "Product added successfully.",
      });

      // Refresh products list
      const updatedRes = await fetch("/api/admin/products");
      const updatedData = await updatedRes.json();
      if (updatedData.products) setProducts(updatedData.products);

      setIsModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to save product." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (p: ProductItem) => {
    const nextStatus = p.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, status: nextStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, status: nextStatus } : item))
        );
      }
    } catch (err) {
      console.error("Status toggle error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setMessage({ type: "success", text: "Product deleted successfully." });
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.composition && p.composition.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {message && (
        <div
          style={{
            padding: "12px 18px",
            borderRadius: "var(--radius-xs)",
            marginBottom: "20px",
            backgroundColor: message.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
            color: message.type === "success" ? "var(--color-success)" : "var(--color-error)",
            border: `1px solid ${message.type === "success" ? "#C8E6D3" : "#F3CACA"}`,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Control bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", width: "320px" }}>
          <Search
            size={16}
            color="var(--color-text-subtle)"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "36px", paddingRight: "12px", paddingBottom: "10px", paddingTop: "10px" }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button type="button" onClick={openAddModal} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="table-container" style={{ borderRadius: "var(--radius-xs)" }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Dosage Form</th>
              <th>Strength</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div
                    style={{
                      position: "relative",
                      width: "42px",
                      height: "42px",
                      border: "1px solid var(--color-border)",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "var(--radius-xs)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={p.image || "/images/products/newpod-100.svg"}
                      alt={p.name}
                      fill
                      style={{ objectFit: "contain", padding: "4px" }}
                    />
                  </div>
                </td>
                <td>
                  <strong style={{ color: "var(--color-primary)" }}>{p.name}</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)" }}>
                    /{p.slug}
                  </div>
                </td>
                <td>
                  <span className="badge badge-secondary">{p.category_name}</span>
                </td>
                <td style={{ fontSize: "0.85rem" }}>{p.dosage_form}</td>
                <td style={{ fontSize: "0.85rem" }}>{p.strength || "—"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(p)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    title="Click to toggle status"
                  >
                    <span
                      className={`badge ${
                        p.status === "Published" ? "badge-success" : "badge-outline"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {p.status === "Published" ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Eye size={12} /> Published
                        </span>
                      ) : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </span>
                  </button>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      className="btn btn-subtle btn-sm"
                      style={{ padding: "6px 10px" }}
                      title="Edit Product"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="btn btn-subtle btn-sm"
                      style={{ padding: "6px 10px", color: "var(--color-error)" }}
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit Product */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(7, 20, 33, 0.6)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-xs)",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "32px",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {editingProduct ? "Edit Product" : "Add New Pharmaceutical Product"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-subtle)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Newpod-100"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Slug</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. newpod-100"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category_name}
                    onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Dosage Form *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.dosage_form}
                    onChange={(e) => setFormData({ ...formData, dosage_form: e.target.value })}
                    placeholder="e.g. Oral Suspension / Tablets / Syrup"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Active Composition</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.composition}
                  onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                  placeholder="e.g. Cefpodoxime Proxetil"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Strength</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.strength}
                    onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                    placeholder="e.g. 100 mg / 5 ml or 200 mg"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Packaging Specification</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.pack_size}
                    onChange={(e) => setFormData({ ...formData, pack_size: e.target.value })}
                    placeholder="e.g. 60 ml bottle or 10x10 blister"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Image Path / URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/products/newpod-100.svg or /uploads/..."
                />
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginTop: "4px" }}>
                  Upload image via the Media Library or provide internal public path.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Product Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Technical overview for clinical and hospital institutional supply..."
                />
              </div>

              <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <label className="form-label" style={{ marginBottom: "4px" }}>Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.875rem" }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
                  {loading ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
