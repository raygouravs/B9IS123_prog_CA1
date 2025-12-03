import { useState } from 'react'
import "./adminreports.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { adminSystemReset, getDeskUtilisation, getMemberUtilisation } from './adminDashboardService';

function AdminReports() {
  const navigate = useNavigate();
    
    const systemReset = () => {
      const ok = window.confirm("Are you sure SYSTEM RESET?");
      if(!ok){
        return;
      }
      adminSystemReset().then((res) => {
        if(res.status === 200){
          alert("SYSTEM RESET COMPLETE");
        }
      })
    };

    const getDeskUtilisation = (date) => {
      getDeskUtilisation(date).then((res) => {
        // populate the pie chart
        console.log("in it");
      })
    };

    const getMemberUtilisation = () => {
      getMemberUtilisation().then((res) => {
        // populate the tabular data
      })
    };
  
    const handleBack = () => {
      navigate(-1);
    };
  
    return (
    <div>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Admin Reports Dashboard</h2>
      
      <h3>System Reset - Releases all resources like bookings, checkins, desks</h3>
      <button onClick={systemReset} style={{height: 40, backgroundColor: 'red', color: 'white', justifyContent: 'center', alignContent: 'center'}}>System Reset</button>

      <h3>Desk Utilisation Report</h3>
      <input id="input-date" placeholder="Enter date in YYYY-MM-DD" style={{width: 180}} />
      <button onClick={getDeskUtilisation} style={{marginLeft: 10, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Generate Report</button>
    </div>
  );

}

export default AdminReports
