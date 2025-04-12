import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './handleliste/handleliste.css'
import { AuthProvider } from './Auth'
import Handleliste from './handleliste/Handleliste'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import TodoList from './todo/TodoList'
import { Navigation } from './components/Navigation'

function App() {
  const [activePage, setActivePage] = React.useState('mat')

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navigation activePage={activePage} onNavigate={setActivePage} />
          <Routes>
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  {activePage === 'mat' ? <Handleliste /> : <TodoList />}
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
