import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './Auth'
import Handleliste from './handleliste/Handleliste'
import Login from './handleliste/Login'
// import SignUp from './handleliste/SignUp'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Handleliste} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup" component={SignUp} /> */}
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
