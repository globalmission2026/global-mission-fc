export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export async function uploadImage(
  file: string | Uint8Array,
  options?: {
    folder?: string;
    publicId?: string;
  },
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = options?.folder ?? "gmfc";

  // Create signature string
  // Parameters must be sorted alphabetically
  let signatureString = `folder=${folder}&timestamp=${timestamp}`;
  if (options?.publicId) {
    signatureString = `folder=${folder}&public_id=${options.publicId}&timestamp=${timestamp}`;
  }
  signatureString += apiSecret;

  // Generate SHA-1 signature using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Prepare form data
  const formData = new FormData();

  let filePath = "";
  if (typeof file === "string") {
    filePath = file;
  } else {
    const base64 = btoa(String.fromCharCode(...file));
    filePath = `data:image/jpeg;base64,${base64}`;
  }

  formData.append("file", filePath);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  if (options?.publicId) {
    formData.append("public_id", options.publicId);
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudinary upload error:", errorText);
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const result = await response.json();

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export function getOptimizedUrl(
  publicId: string,
  options?: { width?: number; height?: number },
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "placeholder";
  let transformations = "q_auto,f_auto";

  if (options?.width) transformations += `,w_${options.width}`;
  if (options?.height) transformations += `,h_${options.height}`;
  if (options?.width || options?.height) transformations += ",c_fill";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
