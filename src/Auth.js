import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth } from './handleliste/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setPending(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    pending,
    setPending
  }

  return (
    <AuthContext.Provider value={value}>
      {!pending && children}
    </AuthContext.Provider>
  )
}

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Logged in successfully')
    } catch (error) {
      console.error('Error logging in: ', error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Auth



