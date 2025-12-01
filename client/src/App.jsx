// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/landing'
import Dashboard from './components/dashboard/dashboard'
import DeskManagement from './components/desks/admindeskmanagement'
import MemberManagement from './components/member/adminmembermanagement'
import ZoneManagement from './components/zone/adminzonemanagement'
import AdminReports from './components/reports_dashboard/adminreports'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />           {/* Landing page */}
      <Route path="/dashboard" element={<Dashboard />} />  {/* Redirect target */}
      <Route path="/desks" element={<DeskManagement />} />
      <Route path="/members" element={<MemberManagement />} />
      <Route path="/zones" element={<ZoneManagement />} />
      <Route path="/reports" element={<AdminReports />} />
    </Routes>
  )
}

export default App

