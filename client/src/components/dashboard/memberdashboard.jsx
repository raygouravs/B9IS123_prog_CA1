import { useState } from 'react'
import "./memberdashboard.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function MemberDashboard() {

  const navigate = useNavigate();
  
  return (
    <>  
        <Navbar title="Hybrid Workspace Management System" />
        <div className="dashboard-container">
          <h2>Welcome to the Member Portal, {localStorage.getItem("full_name")}</h2>
      
          <button className="desks-button1" onClick={() => navigate('/bookings')}>Booking Management</button>

          <button className="logout-button1" onClick={() => navigate('/')}>Logout</button>
        </div>
    </>
  )
}

export default MemberDashboard
