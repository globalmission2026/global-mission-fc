export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const MAX_SIZE = 5 * 1024 * 1024

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateUpload(file: { type: string; size: number }): ValidationResult {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}`,
    }
  }
  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: ${MAX_SIZE / 1024 / 1024}MB`,
    }
  }
  return { valid: true }
}
