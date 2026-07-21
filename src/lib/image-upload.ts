const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024

export class UploadError extends Error {
  constructor(
    message: string,
    public code: 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'UPLOAD_FAILED'
  ) {
    super(message)
  }
}

function validateFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadError(
      `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}`,
      'INVALID_TYPE'
    )
  }
  if (file.size > MAX_SIZE) {
    throw new UploadError(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: ${MAX_SIZE / 1024 / 1024}MB`,
      'FILE_TOO_LARGE'
    )
  }
}

async function compressImage(file: File, maxWidth = 1920, quality = 0.8): Promise<Blob> {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.src = url

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  URL.revokeObjectURL(url)

  let { width, height } = img
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width)
    width = maxWidth
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, width, height)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new UploadError('Canvas compression failed', 'UPLOAD_FAILED'))
      },
      file.type === 'image/png' ? 'image/png' : 'image/webp',
      quality
    )
  })
}

export async function uploadToCloudinary(
  file: File,
  uploadPreset: string,
  folder = 'gmfc'
): Promise<{ url: string; publicId: string }> {
  validateFile(file)
  const compressed = await compressImage(file)

  const formData = new FormData()
  formData.append('file', compressed)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', folder)

  const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new UploadError(
      (err as { error?: { message?: string } }).error?.message ?? 'Upload to Cloudinary failed',
      'UPLOAD_FAILED'
    )
  }

  const data = (await res.json()) as { secure_url: string; public_id: string }
  return { url: data.secure_url, publicId: data.public_id }
}

export async function uploadViaApi(file: File): Promise<{ url: string; publicId: string }> {
  validateFile(file)
  const compressed = await compressImage(file)

  const formData = new FormData()
  formData.append('file', compressed)

  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new UploadError(
      (err as { error?: string }).error ?? 'Upload failed',
      'UPLOAD_FAILED'
    )
  }

  return res.json()
}
