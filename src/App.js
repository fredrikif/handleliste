import React, { useState, useEffect } from 'react'
import './App.css'
import './handleliste/handleliste.css'
import { Navigation } from './components/Navigation'
import Handleliste from './handleliste/Handleliste'
import TodoList from './todo/TodoList'
import Kindergarten from './kindergarten/Kindergarten'
import { auth } from './handleliste/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Login from './Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState('mat')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <div className="app-container">Laster...</div>
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={
          <PrivateRoute>
            <>
              <Navigation activePage={activePage} onNavigate={setActivePage} />
              {activePage === 'ymse' && <TodoList />}
              {activePage === 'bhg' && <Kindergarten />}
              {activePage === 'mat' && <Handleliste />}
            </>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
