import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import firebase from './firebase.js'
import { AuthContext } from '../Auth'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
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

export default withRouter(Login)
