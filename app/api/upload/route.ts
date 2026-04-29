import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se encontro archivo' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${ext}`
    const uploadsDir = join(process.cwd(), 'public', 'uploads')

    await mkdir(uploadsDir, { recursive: true })
    await writeFile(join(uploadsDir, fileName), buffer)

    return NextResponse.json({
      url: `/uploads/${fileName}`,
      name: file.name,
    })
  } catch (error) {
    console.error('Error upload:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}