import React, { useCallback, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { AuthContext } from './Auth'

const Login = () => {
  const navigate = useNavigate()
  const auth = getAuth()

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        navigate('/')
      } catch (error) {
        alert(error.message)
      }
    },
    [auth, navigate]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="app-content">
      <h1>Log in</h1>
      <form className="loginForm shadow" onSubmit={handleLogin}>
        <label>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button className="shadow" type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login