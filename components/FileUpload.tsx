'use client'

import { useState } from 'react'

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
}

export default function FileUpload({ onUpload, accept = '*/*' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) onUpload(data.url)
    } catch (error) {
      console.error('Error:', error)
    }
    setUploading(false)
  }

  return (
    <label className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs cursor-pointer hover:bg-gray-200">
      {uploading ? '⏳ Subiendo...' : '📎 Subir archivo'}
      <input type="file" onChange={handleUpload} accept={accept} className="hidden" disabled={uploading} />
    </label>
  )
}