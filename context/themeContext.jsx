import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light')

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', newMode)
      return newMode
    })
  }

  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode')
    if (savedThemeMode) {
      setThemeMode(savedThemeMode)
    }
  }, [])

  const theme = {
    mode: themeMode,
    toggleTheme,
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }

  return context
}
