import { describe, it, expect } from 'vitest'
import { validateUpload, ALLOWED_TYPES, MAX_SIZE } from '../upload-validation'

describe('validateUpload', () => {
  it('accepts valid JPEG', () => {
    const result = validateUpload({ type: 'image/jpeg', size: 1024 })
    expect(result.valid).toBe(true)
  })

  it('accepts valid PNG', () => {
    const result = validateUpload({ type: 'image/png', size: 1024 })
    expect(result.valid).toBe(true)
  })

  it('accepts valid WebP', () => {
    const result = validateUpload({ type: 'image/webp', size: 1024 })
    expect(result.valid).toBe(true)
  })

  it('accepts valid AVIF', () => {
    const result = validateUpload({ type: 'image/avif', size: 1024 })
    expect(result.valid).toBe(true)
  })

  it('rejects invalid file type', () => {
    const result = validateUpload({ type: 'application/pdf', size: 1024 })
    expect(result.valid).toBe(false)
    expect(result.error).toContain('Invalid file type')
  })

  it('rejects oversized file', () => {
    const result = validateUpload({ type: 'image/jpeg', size: 6 * 1024 * 1024 })
    expect(result.valid).toBe(false)
    expect(result.error).toContain('File too large')
  })

  it('accepts file at exactly max size', () => {
    const result = validateUpload({ type: 'image/jpeg', size: MAX_SIZE })
    expect(result.valid).toBe(true)
  })

  it('rejects file one byte over max', () => {
    const result = validateUpload({ type: 'image/jpeg', size: MAX_SIZE + 1 })
    expect(result.valid).toBe(false)
  })

  it('includes allowed types in error message', () => {
    const result = validateUpload({ type: 'image/gif', size: 1024 })
    ALLOWED_TYPES.forEach(t => expect(result.error).toContain(t))
  })
})

describe('constants', () => {
  it('has expected allowed types', () => {
    expect(ALLOWED_TYPES).toEqual(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
  })

  it('has 5MB max size', () => {
    expect(MAX_SIZE).toBe(5 * 1024 * 1024)
  })
})
