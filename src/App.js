import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './handleliste/handleliste.css'
import { AuthProvider } from './Auth'
import Handleliste from './handleliste/Handleliste'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Handleliste />
              </PrivateRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
