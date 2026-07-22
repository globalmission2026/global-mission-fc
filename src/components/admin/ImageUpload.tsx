"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const handleRemove = () => {
    setPreview(null);
    onUpload("");
  };

  return (
    <div>
      {preview ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 320,
              height: 180,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: 320,
            height: 180,
            border: "2px dashed #d1d5db",
            borderRadius: 8,
            cursor: uploading ? "not-allowed" : "pointer",
            background: "#f9fafb",
            fontSize: 14,
            color: "#6b7280",
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={20} className="gmfci-spinner" /> Uploading...
            </>
          ) : (
            <>
              <Upload size={20} /> Upload Image
            </>
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
      {error && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 4 }}>{error}</p>}
    </div>
  );
}
