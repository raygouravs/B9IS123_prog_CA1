import { useState } from 'react'
import "./dashboard.css";
import { Routes, Route, useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();
  
  return (
    <>
        <div className="dashboard-container">
          <h2>Welcome to the Dashboard</h2>
          <p>This is a protected area accessible only after login.</p>
          <button className="desks-button" onClick={() => navigate('/desks')}>Desks</button>
          <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
        </div>
    </>
  )
}

export default Dashboard
