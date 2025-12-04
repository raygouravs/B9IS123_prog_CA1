import { useState } from 'react'
import "./memberdashboard.css";
import { Routes, Route, useNavigate } from 'react-router-dom';

function MemberDashboard() {

  const navigate = useNavigate();
  
  return (
    <>
        <div className="dashboard-container">
          <h2>Welcome to the Member Portal</h2>
      
          <button className="desks-button1" onClick={() => navigate('/bookings')}>Booking Management</button>

          <button className="desks-button1" onClick={() => navigate('/checkins')}>Check-in Management</button>

          <button className="logout-button1" onClick={() => navigate('/')}>Logout</button>
        </div>
    </>
  )
}

export default MemberDashboard
