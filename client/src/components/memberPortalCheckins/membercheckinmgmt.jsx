import { useState } from 'react'
import "./membercheckinmgmt.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
//import { getAllDesks, createDesk, updateDesk, deleteDesk } from "./membercheckinservice";


function MemberCheckinManagement() {

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    
  <div style={{ paddingTop: "250px" }}>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Checkin Management</h2>
      <h3>Checkin</h3>
    </div>
  );
}

export default MemberCheckinManagement
