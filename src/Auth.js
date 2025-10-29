import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from './handleliste/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email format')
    }
    
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      // Translate Firebase errors to user-friendly messages
      let message = 'An error occurred during login'
      if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address'
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password'
      } else if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email'
      }
      throw new Error(message)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



