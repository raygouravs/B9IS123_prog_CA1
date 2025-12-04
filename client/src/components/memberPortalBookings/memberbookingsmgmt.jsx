/*
    REFERENCE : Lines 90-129 - The div list UI compoenent is taken from Chat-GPT as a re-usable UI component.
*/

import { useState } from 'react'
import "./memberbookingsmgmt.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAvailableSeats , createBooking , getAllBookings } from "./memberbookingservice.js";



function MemberBookingManagement() {

  const navigate = useNavigate();
  const [availSeats, setAvailSeats] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  
  const handleBack = () => {
    navigate(-1);
  };

  const getAllBookingsData = () => {
    const member_id = localStorage.getItem("member_id");
    const memberIdNum = parseInt(member_id, 10);
    getAllBookings().then((data) => {
        if(!data) {
            alert("No data found!");
        }
        const member_data = data.filter(b => b.member_id === memberIdNum);
        console.log("Filtered Member Data -->", JSON.stringify(member_data, null, 2));
        setBookingData(member_data);
    });
  }

  const handleBooking = (desk, duration_id) => {
    console.log("Booking data --> " + desk);
    const ok = window.confirm(`Are you sure you want to book desk id: ${desk.desk_id} ?`);
    if(ok){
        const bookingData = {
            "booking": {
                "member_id": localStorage.getItem("member_id"),
                "desk_id": desk.desk_id,
                "duration_id": duration_id,
                "booking_date": localStorage.getItem("booking-date-member-portal"),
                "status": "pending"
            }
        }
        createBooking(bookingData).then((data) => {
            alert(data.message);
            const date = localStorage.getItem("booking-date-member-portal");
    getAvailableSeats(date).then((data) => {
        if(!data){
            alert("No data found!");
        }
        console.log("Avail. Desks Data =", JSON.stringify(data.data, null, 2));
        if(data.message === "success"){
            const modData = [];
            data.data.forEach((desk) => {
                let first_half_but = false;
                let second_half_but = false;
                let full_day_but = false;
                if(desk.first_half_booked === 0 && desk.second_half_booked === 0){
                    first_half_but = true;
                    second_half_but = true;
                    full_day_but = true;
                } else if(desk.first_half_booked === 1 && desk.second_half_booked === 0){
                    first_half_but = false;
                    second_half_but = true;
                    full_day_but = false;
                } else if(desk.first_half_booked === 0 && desk.second_half_booked === 1){
                    first_half_but = true;
                    second_half_but = false;
                    full_day_but = false;
                }
                modData.push({
                    "desk_id": desk.desk_id,
                    "desk_code": desk.desk_code,
                    "zone_id": desk.zone_id,
                    "features": desk.features,
                    "booking_date": desk.booking_date,
                    first_half_but,
                    second_half_but,
                    full_day_but
                });
            })
            console.log("Mod Desks Data -->", JSON.stringify(modData, null, 2));
            setAvailSeats(modData);           
        } else if(data.message === "failure") {
            alert("Please enter a valid date!");
        } else {
            alert("No data found!");
        }
    });
    // reload the view bookings data;
    getAllBookingsData();
        });
    }
  }

  const getAvailableSeatsForDate = () => {
    const date = document.getElementById("input-date").value;
    localStorage.setItem("booking-date-member-portal", date);
    getAvailableSeats(date).then((data) => {
        if(!data){
            alert("No data found!");
        }
        console.log("Avail. Desks Data =", JSON.stringify(data.data, null, 2));
        if(data.message === "success"){
            const modData = [];
            data.data.forEach((desk) => {
                let first_half_but = false;
                let second_half_but = false;
                let full_day_but = false;
                if(desk.first_half_booked === 0 && desk.second_half_booked === 0){
                    first_half_but = true;
                    second_half_but = true;
                    full_day_but = true;
                } else if(desk.first_half_booked === 1 && desk.second_half_booked === 0){
                    first_half_but = false;
                    second_half_but = true;
                    full_day_but = false;
                } else if(desk.first_half_booked === 0 && desk.second_half_booked === 1){
                    first_half_but = true;
                    second_half_but = false;
                    full_day_but = false;
                }
                modData.push({
                    "desk_id": desk.desk_id,
                    "desk_code": desk.desk_code,
                    "zone_id": desk.zone_id,
                    "features": desk.features,
                    "booking_date": desk.booking_date,
                    first_half_but,
                    second_half_but,
                    full_day_but
                });
            })
            console.log("Mod Desks Data -->", JSON.stringify(modData, null, 2));
            setAvailSeats(modData);           
        } else if(data.message === "failure") {
            alert("Please enter a valid date!");
        } else {
            alert("No data found!");
        }
    });
  };

  return (
    
  <div style={{ paddingTop: "0px" }}>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Booking Management</h2>
      <h3>Create Booking</h3>
      <input id="input-date" placeholder="Enter date in YYYY-MM-DD" style={{width: 180}} />
      <button onClick={getAvailableSeatsForDate} style={{marginLeft: 20, marginBottom: 20, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>View Available Seats</button>

    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      {availSeats.map((desk) => {
  return (
    <div
      key={desk.desk_id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
        padding: "8px 0"
      }}
    >
      {/* Desk info */}
      <div>
        <strong>ID:</strong> {desk.desk_id} |{" "}
        <strong>Code:</strong> {desk.desk_code} |{" "}
        <strong>Zone:</strong> {desk.zone_id} |{" "}
        <strong>Features:</strong> {desk.features}
      </div>

      {/* Booking buttons */}
      <div>
        <button
          disabled={!desk.first_half_but}
          onClick={() => handleBooking(desk, 1)}
          style={{marginLeft:10, backgroundColor: desk.first_half_but ? 'lightblue' : 'lightgrey', color: 'white'}}>
          Book First Half
        </button>{" "}
        <button
          disabled={!desk.second_half_but}
          onClick={() => handleBooking(desk, 2)}
          style={{backgroundColor: desk.second_half_but ? 'lightblue' : 'lightgrey', color: 'white'}}>
          Book Second Half
        </button>{" "}
        <button
          disabled={!desk.full_day_but}
          onClick={() => handleBooking(desk, 3)}
          style={{backgroundColor: desk.full_day_but ? 'lightblue' : 'lightgrey', color: 'white'}}>
          Book Full Day
        </button>
      </div>
    </div>
        );
    })}      
    </div>

    <h3>View Member Bookings</h3>
      <button onClick={getAllBookingsData} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Load Member Bookings</button>
      <p>Duration ID: 1 - MORNING, 2 - AFTERNOON, 3 - FULL DAY</p>
      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid lightgray",
      borderRadius: "5px",
      height: "300px",
      overflowY: "scroll"
      }}>
      {bookingData.map((d) => (
        <p key={d.booking_id}>
        desk_id - {d.desk_id}, duration_id - {d.duration_id}, booking_date - {d.booking_date},
        status - {d.status};
        </p>
      ))}
      </div>
    </div>
  );
}

export default MemberBookingManagement
