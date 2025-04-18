import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth'

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
