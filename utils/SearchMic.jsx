import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button } from '@mui/material'
import MicIcon from '../assets/svg/MicIcon'
import { MicGif, MicSection } from '../styles/home'
import { useBhashiniApi } from './useBhashani'
import Recorder from '../assets/gif/mic.gif'
import ModalComponent from '../components/common/Modal'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { ToastContext } from '../../src/context/toastContext'
import { toast_actions, toast_types } from '../../src/components/shared/toast/utils/toast'
// import { useSpeech } from '../context/speechContext'

const Mic = ({ onChangeSearch }) => {
  const dispatch = useContext(ToastContext)
  // const { isListening, setIsListening } = useSpeech()
  const mediaRecorderRef = useRef(null)
  const [base64Audio, setBase64Audio] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { withoutConfigRequest, computeRequestASR } = useBhashiniApi()
  const { transcript, listening, isMicrophoneAvailable } = useSpeechRecognition()

  const microphoneRef = useRef(null)

  useEffect(() => {
    withoutConfigRequest()
  }, [])

  const startRecording = async () => {
    setShowModal(true)
    setBase64Audio('')

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' })
        if (permissionStatus.state === 'granted' && isMicrophoneAvailable) {
          startRecordingInternal()
        } else if (permissionStatus.state === 'denied') {
          throw new Error('Microphone permission denied.')
        } else {
          await navigator.mediaDevices.getUserMedia({ audio: true })
          startRecordingInternal()
        }
      } else {
        throw new Error('Media not supported.')
      }
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message: error.message,
        },
      })
    }
  }

  const startRecordingInternal = async () => {
    await navigator?.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        const chunks = []

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          convertToWav(blob).then((base64) => {
            setBase64Audio(base64)
          })
        }

        mediaRecorder.start()
        SpeechRecognition.startListening()

        // Stop recording after 5 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop()
            stopRecording()
          }
        }, 5000)

        // Check for silence
        checkSilence(stream)
      })
      .catch((error) => {
        dispatch({
          type: toast_actions.ADD_TOAST,
          payload: {
            id: Math.floor(Math.random() * 100),
            type: toast_types.error,
            message: error?.response?.data?.error?.message,
          },
        })
      })
  }

  const checkSilence = (stream) => {
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const microphone = audioContext.createMediaStreamSource(stream)
    microphone.connect(analyser)

    analyser.fftSize = 2048 // Configure the FFT size
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const checkInterval = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray)
      const isSilent = dataArray.every((value) => value < 128) // Check if all audio data is silent
      if (isSilent) {
        clearInterval(checkInterval)
        mediaRecorderRef.current.stop()
      }
    }, 100)
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      await mediaRecorderRef.current.stop()
      SpeechRecognition.stopListening()

      // Release microphone access
      const stream = mediaRecorderRef.current.stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const convertToWav = async (blob) => {
    const audioContext = new AudioContext()
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)

    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const buffer = reader.result
        try {
          const audioBuffer = await audioContext.decodeAudioData(buffer)
          const wavBlob = encodeWav(audioBuffer)
          const base64 = await blobToBase64(wavBlob)
          resolve(base64)
        } catch (err) {
          reject(err)
        }
      }

      reader.onerror = reject
    })
  }
  const encodeWav = (audioBuffer) => {
    const numberOfChannels = audioBuffer.numberOfChannels
    const sampleRate = audioBuffer.sampleRate
    const interleaved = interleave(audioBuffer)

    const buffer = new ArrayBuffer(44 + interleaved.length * 2)
    const view = new DataView(buffer)

    writeUTFBytes(view, 0, 'RIFF')
    view.setUint32(4, 36 + interleaved.length * 2, true)
    writeUTFBytes(view, 8, 'WAVE')
    writeUTFBytes(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numberOfChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 4, true)
    view.setUint16(32, numberOfChannels * 2, true)
    view.setUint16(34, 16, true)
    writeUTFBytes(view, 36, 'data')
    view.setUint32(40, interleaved.length * 2, true)

    floatTo16BitPCM(view, 44, interleaved)

    return new Blob([view], { type: 'audio/wav' })
  }

  const interleave = (audioBuffer) => {
    const numberOfChannels = audioBuffer.numberOfChannels
    const length = audioBuffer.length * numberOfChannels
    const result = new Float32Array(length)
    const input = []
    for (let i = 0; i < numberOfChannels; i++) {
      input.push(audioBuffer.getChannelData(i))
    }

    let index = 0
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let j = 0; j < numberOfChannels; j++) {
        result[index++] = input[j][i]
      }
    }

    return result
  }

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]))
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
    }
  }

  const writeUTFBytes = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        resolve(reader.result)
      }

      reader.onerror = reject
    })
  }

  useEffect(() => {
    // Check if transcript is not empty
    if (base64Audio && transcript.trim() !== '') {
      const base64WithoutPrefix = base64Audio.substring(base64Audio.indexOf(',') + 1)
      computeRequestASR(base64WithoutPrefix).then((searchText) => {
        const query = searchText?.pipelineResponse[0]?.output[0]?.source
        if (query) {
          onChangeSearch(query)
        }

        setBase64Audio('')
        setShowModal(false)
      })
    }
  }, [base64Audio, transcript])

  return (
    <div>
      <div>
        <MicSection ref={microphoneRef}>
          <MicIcon onClick={startRecording} />
        </MicSection>
      </div>
      {showModal && (
        <ModalComponent
          open={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          title="Speak Now"
          className="mic_modal"
        >
          <MicSection>
            <MicGif>
              <img src={Recorder} alt="recorder" />
            </MicGif>
            <div>
              <p>Microphone: {listening ? 'on' : 'off'}</p>
              <p>{transcript}</p>
              {transcript.trim() === '' && !listening && <Button onClick={startRecording}>Try Again</Button>}
            </div>
          </MicSection>
        </ModalComponent>
      )}
    </div>
  )
}

export default Mic
