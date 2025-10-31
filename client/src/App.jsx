// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/landing'
import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />           {/* Landing page */}
      <Route path="/dashboard" element={<Dashboard />} />  {/* Redirect target */}
    </Routes>
  )
}

export default App

