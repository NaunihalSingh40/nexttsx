import { createContext, useContext, useState } from 'react'

const defaultState = {
  islistening: false,
  setIsListening: () => null,
}

const SpeechContext = createContext(defaultState)

export const SpeechProvider = ({ children }) => {
  const [listening, setIslistening] = useState(false)
  return <SpeechContext.Provider value={{ listening, setIslistening }}>{children}</SpeechContext.Provider>
}

export const useSpeech = () => useContext(SpeechContext)
