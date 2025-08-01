import React, { useRef, useState } from 'react'
import { Mic } from 'lucide-react'

export default function AudioRecorder({ onRecord }) {
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    chunksRef.current = []

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data)
    }

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
      onRecord(file)
    }

    mediaRecorderRef.current.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex flex-col items-center gap-4">
      <Mic size={40} className="text-red-400" />
      <h3 className="text-lg font-medium">Record Audio</h3>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`w-full py-2 px-4 rounded-md text-white font-bold transition ${
          recording
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  )
}
