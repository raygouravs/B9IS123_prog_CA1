import { useState } from 'react'
import "./adminzonemanagement.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAllZones } from "./zoneService";


function ZoneManagement() {

  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  
  const loadZones = () => {
    getAllZones().then((res) => {
      setZones(res)
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    
  <div style={{ paddingTop: "50px", borderColor: "teal", borderWidth: "1px", borderRadius: "5px" }}>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Zone Management</h2>
      
      <h3>All Zones</h3>
      <button onClick={loadZones} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Load Zones</button>

      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "2px solid teal",
      borderRadius: "10px",
      height: "300px",
      overflowY: "scroll"
      }}
>
      {zones.map((z) => (
        <p key={z.zone_id}>
        zone_id - {z.zone_id}, zone_name - {z.zone_name}, floor - {z.floor},
        description - {z.description};
        </p>
      ))}
      </div>
    </div>
  );
}

export default ZoneManagement
