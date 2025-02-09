import React, { createContext, useContext, useEffect, useState } from 'react'
import { initialPaletteState } from '../utils/NewTheme/newThemePalette'

// Define a new context for the theme
const ThemeContext = createContext()

// Create a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

// Define the provider component to wrap your app with the theme context
export const NewThemeProvider = ({ children }) => {
  // Function to load the theme from local storage
  const loadThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? JSON.parse(savedTheme) : null
  }

  // Function to save the theme to local storage
  const saveThemeToLocalStorage = (newTheme) => {
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }

  const [theme, setTheme] = useState(loadThemeFromLocalStorage() || initialPaletteState)

  // Function to update the theme state
  const updateTheme = (newTheme) => {
    setTheme(newTheme)
  }

  // Save theme to local storage whenever theme changes
  // useEffect(() => {
  //   saveThemeToLocalStorage(theme)
  // }, [theme])

  useEffect(() => {
    const newThemeMode = localStorage.getItem('theme')
    if (newThemeMode) {
      saveThemeToLocalStorage(theme)
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>
}
