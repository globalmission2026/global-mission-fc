import { describe, it, expect } from 'vitest'
import { UploadError } from '../image-upload'

describe('UploadError', () => {
  it('creates error with correct code and message', () => {
    const err = new UploadError('File too large', 'FILE_TOO_LARGE')
    expect(err).toBeInstanceOf(UploadError)
    expect(err.message).toBe('File too large')
    expect(err.code).toBe('FILE_TOO_LARGE')
  })

  it('creates INVALID_TYPE error', () => {
    const err = new UploadError('Bad type', 'INVALID_TYPE')
    expect(err.code).toBe('INVALID_TYPE')
  })

  it('creates UPLOAD_FAILED error', () => {
    const err = new UploadError('Upload failed', 'UPLOAD_FAILED')
    expect(err.code).toBe('UPLOAD_FAILED')
  })
})
