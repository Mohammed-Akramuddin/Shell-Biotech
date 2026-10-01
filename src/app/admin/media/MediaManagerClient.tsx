"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Copy, Check, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface MediaItem {
  id: number;
  filename: string;
  file_url: string;
  file_type: string;
  size_bytes: number;
  created_at: string;
}

interface Props {
  initialMedia: MediaItem[];
}

export default function MediaManagerClient({ initialMedia }: Props) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");

      setMessage({ type: "success", text: `File "${file.name}" uploaded successfully!` });

      const updatedRes = await fetch("/api/admin/media");
      const updatedData = await updatedRes.json();
      if (updatedData.media) setMediaList(updatedData.media);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Failed to upload file." });
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

      {/* Upload Box */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px dashed var(--color-border)",
          borderRadius: "var(--radius-xs)",
          padding: "36px",
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <Upload size={32} color="var(--color-secondary)" style={{ margin: "0 auto 12px auto" }} />
        <h3 style={{ fontSize: "1.2rem", marginBottom: "6px", color: "var(--color-primary)" }}>
          Upload New Image or Document
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "20px", maxWidth: "480px", margin: "0 auto 20px auto" }}>
          Upload official product photographs, corporate office images, or regulatory PDFs (JPG, PNG, WEBP, SVG, PDF up to 10MB).
        </p>

        <label className="btn btn-primary btn-sm" style={{ cursor: "pointer", display: "inline-flex" }}>
          {uploading ? "Uploading..." : "Select File to Upload"}
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png,.webp,.svg,.pdf"
          />
        </label>
      </div>

      {/* Media Gallery */}
      <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--color-primary)" }}>
        Uploaded Media Files ({mediaList.length})
      </h3>

      {mediaList.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {mediaList.map((item) => {
            const isImage = item.file_type.startsWith("image/");
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xs)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "140px",
                    backgroundColor: "var(--color-bg-alt)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isImage ? (
                    <Image
                      src={item.file_url}
                      alt={item.filename}
                      fill
                      style={{ objectFit: "contain", padding: "8px" }}
                    />
                  ) : (
                    <FileText size={40} color="var(--color-secondary)" />
                  )}
                </div>

                <div style={{ padding: "14px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginBottom: "6px",
                    }}
                    title={item.filename}
                  >
                    {item.filename}
                  </div>

                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-subtle)", marginBottom: "12px" }}>
                    {(item.size_bytes / 1024).toFixed(1)} KB • {item.file_type}
                  </div>

                  <button
                    type="button"
                    onClick={() => copyUrl(item.id, item.file_url)}
                    className="btn btn-subtle btn-sm"
                    style={{ marginTop: "auto", width: "100%", justifyContent: "center", fontSize: "0.78rem" }}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={14} color="var(--color-success)" /> Copied URL!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xs)",
            padding: "48px",
            textAlign: "center",
            color: "var(--color-text-muted)",
          }}
        >
          No uploaded media files yet.
        </div>
      )}
    </div>
  );
}
