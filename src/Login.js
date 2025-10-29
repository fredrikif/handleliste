import React, { useState, useCallback } from 'react'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = useCallback(async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required')
      return
    }

    try {
      setError('')
      await login(email.trim(), password.trim())
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }, [email, password, login, navigate])

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}