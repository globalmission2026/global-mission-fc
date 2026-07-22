import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'
import { validateUpload } from '@/lib/upload-validation'

export const runtime = 'nodejs'

const API_KEY = process.env.UPLOAD_API_KEY

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-api-key')
  if (!authHeader || authHeader !== API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const validation = validateUpload(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadImage(buffer, { folder: 'gmfc' })

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
