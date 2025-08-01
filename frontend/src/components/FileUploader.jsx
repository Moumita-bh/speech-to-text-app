import React from 'react'
import { Upload } from 'lucide-react'

export default function FileUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('audio/')) {
      onUpload(file)
    } else {
      alert('Please upload a valid audio file.')
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex flex-col items-center gap-3">
      <Upload size={40} className="text-orange-400" />
      <h3 className="text-lg font-medium">Upload Audio</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleChange}
        className="text-sm text-white file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-purple-600 file:text-white hover:file:bg-purple-700"
      />
    </div>
  )
}
