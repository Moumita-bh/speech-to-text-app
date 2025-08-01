import { useState } from 'react'
import FileUploader from './components/FileUploader'
import AudioRecorder from './components/AudioRecorder'

import { Upload, Mic, FileText } from 'lucide-react'

export default function App() {
  const [transcription, setTranscription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (file) => {
    setLoading(true)
    setTranscription('')
    setError('')
    const formData = new FormData()
    formData.append('audio', file)

    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setTranscription(data.transcription)
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center p-4 text-white font-sans overflow-hidden">
     

      <div className="w-full max-w-3xl bg-gray-900 bg-opacity-90 rounded-3xl p-8 shadow-2xl border border-purple-700 space-y-6">
        <div className="text-center">
          <div className="text-purple-400 text-3xl font-bold mb-2 flex justify-center items-center gap-2">
            <Mic size={28} className="text-purple-300" />
            Speech-to-Text Transcription App
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUploader onUpload={handleUpload} />
          <AudioRecorder onRecord={handleUpload} />
        </div>

        {loading && (
          <p className="text-center text-purple-300 animate-pulse mt-4">
            Transcribing...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {transcription && (
          <div className="bg-gray-800 p-5 rounded-lg border border-purple-600">
            <h2 className="text-xl font-semibold text-purple-300 mb-2 flex items-center gap-2">
              <FileText size={20} /> Transcription
            </h2>
            <p className="text-gray-100 whitespace-pre-wrap">{transcription}</p>
          </div>
        )}
      </div>
    </div>
   
  )
}
