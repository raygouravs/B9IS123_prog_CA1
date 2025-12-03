import { useState } from 'react'
import "./adminreports.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { adminSystemReset, getDeskUtilisation, getMemberUtilisation } from './adminDashboardService';
import DashboardPieChart from './DashboardPieChart';

function AdminReports() {
  const navigate = useNavigate();
  const [pieData, setPieData] = useState();
    
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

    const getDeskUtilisationData = (date) => {
      const s_date = document.getElementById("input-date").value;
      console.log("s_date: " + s_date);
      getDeskUtilisation(s_date)
      .then((data) => {
      if (!data) {
        console.error("No data returned from API");
        return;
      }

      console.log("Data =", JSON.stringify(data, null, 2));

      const { booked_count, available_count, booked_percentage, available_percentage } = data;

      const chartData = [
        { title: "booked", value: booked_percentage, color: "blue" },
        { title: "available", value: available_percentage, color: "orange" },
      ];

      console.log("API data:", data);
      console.log("Chart data:", chartData);

      setPieData(chartData);
    })
    .catch((err) => {
      console.error("Error fetching desk utilisation:", err);
    });
};


    const getMemberUtilisationData = () => {
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
      <button onClick={getDeskUtilisationData} style={{marginLeft: 10, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Generate Report</button>
      <div style={{marginTop: 20, marginLeft: 0, borderWidth: 0.5, width: 300, height: 300}}>
        <DashboardPieChart data={pieData}/>
      </div>
    </div>
    );

}

export default AdminReports
