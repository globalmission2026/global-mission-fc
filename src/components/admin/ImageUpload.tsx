"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/image-upload";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  uploadPreset?: string;
}

export default function ImageUpload({
  onUpload,
  currentUrl,
  uploadPreset = "gmfc_unsigned",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const result = await uploadToCloudinary(file, uploadPreset, "gmfc/events");
      setPreview(result.url);
      onUpload(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload("");
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {preview ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            background: "#f9fafb",
          }}
        >
          <Image
            src={preview}
            alt="Uploaded image"
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
              opacity: 0.8,
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              color: "#ef4444",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.2s ease",
            }}
            title="Remove image"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 16,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "13px",
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <ImageIcon size={14} /> Image Uploaded
          </div>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            aspectRatio: "16/9",
            border: `2px dashed ${isDragOver ? "#f59e0b" : "#d1d5db"}`,
            borderRadius: "12px",
            cursor: uploading ? "not-allowed" : "pointer",
            background: isDragOver ? "rgba(245, 158, 11, 0.05)" : "#fafafa",
            transition: "all 0.3s ease",
            color: isDragOver ? "#d97706" : "#6b7280",
            overflow: "hidden",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            if (!uploading && !isDragOver) {
              e.currentTarget.style.borderColor = "#9ca3af";
              e.currentTarget.style.background = "#f3f4f6";
            }
          }}
          onMouseLeave={(e) => {
            if (!uploading && !isDragOver) {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.background = "#fafafa";
            }
          }}
        >
          {uploading ? (
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
            >
              <Loader2 size={32} className="gmfci-spinner" style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#4b5563" }}>
                Uploading to Cloudinary...
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  background: isDragOver ? "rgba(245, 158, 11, 0.1)" : "#f3f4f6",
                  padding: "16px",
                  borderRadius: "50%",
                  color: isDragOver ? "#d97706" : "#9ca3af",
                  transition: "all 0.3s ease",
                }}
              >
                <UploadCloud size={32} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#374151", margin: 0 }}>
                  Click to upload{" "}
                  <span style={{ fontWeight: 400, color: "#6b7280" }}>or drag and drop</span>
                </p>
                <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
                  SVG, PNG, JPG or WEBP (max. 5MB)
                </p>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFile}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </label>
      )}
      {error && (
        <div
          style={{
            marginTop: "8px",
            padding: "10px 14px",
            background: "#fef2f2",
            borderLeft: "4px solid #ef4444",
            borderRadius: "4px",
            color: "#b91c1c",
            fontSize: "13px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <X size={14} /> {error}
        </div>
      )}
    </div>
  );
}
