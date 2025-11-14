import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')   // ✅ correct key
    setIsLoggedIn(!!token)
  }, [])

  const login = (token) => {
    localStorage.setItem('authToken', token)          // ✅ correct key
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
