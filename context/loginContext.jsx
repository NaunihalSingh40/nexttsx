import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const checkLoginStatus = () => {
    return !!Cookies.get('user') || !!Cookies.get('token')
  }

  useEffect(() => {
    setLoggedIn(checkLoginStatus())
  }, [])

  const login = () => {
    setLoggedIn(true)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        login,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
