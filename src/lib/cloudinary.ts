import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

export async function uploadImage(
  file: string | Buffer,
  options?: {
    folder?: string
    publicId?: string
  }
): Promise<CloudinaryUploadResult> {
  const filePath = typeof file === 'string' ? file : `data:image/jpeg;base64,${file.toString('base64')}`
  const result = await cloudinary.uploader.upload(filePath, {
    folder: options?.folder ?? 'gmfc',
    public_id: options?.publicId,
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
      { width: 1920, crop: 'limit' },
    ],
  })

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  }
}

export function getOptimizedUrl(publicId: string, options?: { width?: number; height?: number }): string {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    width: options?.width,
    height: options?.height,
    crop: options?.width || options?.height ? 'fill' : undefined,
  })
}

export { cloudinary }
