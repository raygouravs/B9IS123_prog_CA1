import { useState } from 'react'
import "./memberbookingsmgmt.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAllDesks, createDesk, updateDesk, deleteDesk } from "./memberbookingservice.js";


function MemberBookingManagement() {

  const navigate = useNavigate();
  const [desks, setDesks] = useState([]);
  
  const loadDesks = () => {
    getAllDesks().then((res) => {
      setDesks(res);
    });
  };

  const handleCreate = () => {
    const data = document.getElementById("desk_create_name").value;
    const [desk_code, zone_id, features, status] = data
    .split(",")
    .map(item => item.trim());
    const result = {
      desk: {
        desk_code,
        zone_id,
        features,
        status
      }
    };
    createDesk(result).then(loadDesks);
  };

  const handleUpdate = () => {
    const id = document.getElementById("up_desk_id").value;
    const zone_id = document.getElementById("up_zone_id").value;
    const desk_code = document.getElementById("up_desk_code").value;
    const features = document.getElementById("up_features").value;
    const result = {
        zone_id,
        desk_code,
        features
    }
    updateDesk(id, result).then(loadDesks);
  };

  const handleDelete = () => {
    const id = document.getElementById("desk_delete_id").value;
    deleteDesk(id).then(loadDesks).catch((err) => {
      if (err.response && err.response.status === 500){
        alert("Cannot delete desk as it is booked currently!");
      } else {
        alert("Error deleting desk!")
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    
  <div style={{ paddingTop: "250px" }}>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Desk Management</h2>
      <h3>Create Desk</h3>
      <input id="desk_create_name" placeholder="desk_code, zone_id, features, status" />
      <p>Desk Codes: 1. CUBICLE 2. WORKSTATION 3. CONFERENCE ROOM 4. PRIVATE OFFICE; Zone ID: 1, 2, 3, 4; Features: Description; Status: available</p>
      <button onClick={handleCreate} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Create</button>


      <h3>All Desks</h3>
      <button onClick={loadDesks} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Load Desks</button>

      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid lightgray",
      borderRadius: "5px",
      height: "300px",
      overflowY: "scroll"
      }}
>
      {desks.map((d) => (
        <p key={d.desk_id}>
        desk_id - {d.desk_id}, desk_code - {d.desk_code}, zone_id - {d.zone_id},
        features - {d.features}, status - {d.status};
        </p>
      ))}
      </div>

  
      <h3>Update Desk</h3>
      <input id="up_desk_id" placeholder="Desk ID" />
      <input id="up_zone_id" placeholder="New Zone ID" />
      <input id="up_desk_code" placeholder="New Desk Code" />
      <input id="up_features" placeholder="New Features" />
      <button onClick={handleUpdate} style={{marginLeft: 20, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Update</button>

      <h3>Delete Desk</h3>
      <input id="desk_delete_id" placeholder="Desk ID" />
      <button onClick={handleDelete} style={{marginLeft: 20, marginBottom:50, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Delete</button>
    </div>
  );
}

export default MemberBookingManagement
