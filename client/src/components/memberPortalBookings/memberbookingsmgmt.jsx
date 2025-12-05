/*
    REFERENCE : The div list UI component and scrolling DIV UI Components in this page are taken from Chat-GPT as re-usable UI components.
*/

import { useState } from 'react'
import "./memberbookingsmgmt.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAvailableSeats , createBooking , getAllBookings , deleteBooking , getFreeSlotsNextWeek , updateBooking , createCheckin } from "./memberbookingservice.js";



function MemberBookingManagement() {

  const navigate = useNavigate();
  const [availSeats, setAvailSeats] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [freeSlots, setFreeSlots] = useState([]);
  const [ubookingID, setUbookingID] = useState();
  
  const handleBack = () => {
    navigate(-1);
  };

    const handleDeleteBooking = () => {
        const ok = window.confirm("Are you sure you want to delete?");
        if (ok) {
            const id = document.getElementById("booking_delete_id").value;
            deleteBooking(id).then((data) => {
                // reload the view bookings data;
                getAllBookingsData();
                // reload availalbe seats
                const date = localStorage.getItem("booking-date-member-portal");
                getAvailableSeats(date).then((data) => {
                    if (!data) {
                        alert("No data found!");
                    }
                    console.log("Avail. Desks Data =", JSON.stringify(data.data, null, 2));
                    if (data.message === "success") {
                        const modData = [];
                        data.data.forEach((desk) => {
                            let first_half_but = false;
                            let second_half_but = false;
                            let full_day_but = false;
                            if (desk.first_half_booked === 0 && desk.second_half_booked === 0) {
                                first_half_but = true;
                                second_half_but = true;
                                full_day_but = true;
                            } else if (desk.first_half_booked === 1 && desk.second_half_booked === 0) {
                                first_half_but = false;
                                second_half_but = true;
                                full_day_but = false;
                            } else if (desk.first_half_booked === 0 && desk.second_half_booked === 1) {
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
                    } else if (data.message === "failure") {
                        alert("Please enter a valid date!");
                    } else {
                        alert("No data found!");
                    }
                });
            }).catch((err) => {
                if (err.response && err.response.status === 500) {
                    alert("Cannot delete booking due to referential integrity constraints!");
                } else {
                    alert("Error deleting desk!")
                }
            });
        }
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
        if (ok) {
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
                    if (!data) {
                        alert("No data found!");
                    }
                    console.log("Avail. Desks Data =", JSON.stringify(data.data, null, 2));
                    if (data.message === "success") {
                        const modData = [];
                        data.data.forEach((desk) => {
                            let first_half_but = false;
                            let second_half_but = false;
                            let full_day_but = false;
                            if (desk.first_half_booked === 0 && desk.second_half_booked === 0) {
                                first_half_but = true;
                                second_half_but = true;
                                full_day_but = true;
                            } else if (desk.first_half_booked === 1 && desk.second_half_booked === 0) {
                                first_half_but = false;
                                second_half_but = true;
                                full_day_but = false;
                            } else if (desk.first_half_booked === 0 && desk.second_half_booked === 1) {
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
                    } else if (data.message === "failure") {
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

  const handleReschedule = (desk_id, booking_id) => {
    console.log("Desk id:" + desk_id);
    getFreeSlotsNextWeek(desk_id).then((data) => {
        console.log("Free slots data =", JSON.stringify(data, null, 2));
        if(!data){
            alert("No free slots found !");
        }
        setFreeSlots(data.data);
        setUbookingID(booking_id);
    });
  };

  const updateBookingH = (slot_date, duration_id) => {
    const updateBookingData = {
        duration_id,
        "booking_date": slot_date
    }
    updateBooking(ubookingID, updateBookingData).then((data) => {
        console.log(data.message);
        alert(data.message);
        // reload the view bookings data;
        getAllBookingsData();
        // clear the free slots table;
        setFreeSlots([]);
    });
  };

  const handleCheckIn = (booking_id, duration_id) => {
    let checkin_time = ""
    if(duration_id === 1 || duration_id === 3){
        checkin_time = "08:00:00"
    } else if(duration_id === 2) {
        checkin_time = "13:00:00"
    }
    const checkinData = {
        "checkin": {
            "booking_id": booking_id,
            "checkin_time": checkin_time,
            "auto_released": 0
        }
    }
    createCheckin(checkinData).then((data) => {
        if(!data){
            alert("Error creating checkin!");
        } 
        console.log(data.message);  
        if(data.message === "Checkin created successfully!"){
            alert("Check-in successful!");
            // reload the view bookings data;
            getAllBookingsData();
        }
    });
  };

  return (
    
  <div style={{ paddingTop: "800px" }}>
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
      {bookingData.length > 0 ? bookingData.map((d) => (
          <div key={d.booking_id}>
              <div key={d.booking_id}>
                  booking_id - {d.booking_id},
                  desk_id - {d.desk_id},
                  duration_id - {d.duration_id},
                  booking_date - {d.booking_date},
                  status - {d.status}
                  <button
                      style={{ marginLeft: "10px", backgroundColor: '#B8F5CE' }}
                      onClick={() => handleReschedule(d.desk_id, d.booking_id)}>Re-schedule</button>
                  <button
                      style={{ marginLeft: "10px", backgroundColor: 'lightblue' }}
                      onClick={() => handleCheckIn(d.booking_id, d.duration_id)}
                      disabled={d.status !== 'pending'}
                      >Check-in</button>
              </div>
          </div>
      )) : <div>No Booking Data found. Reload table.</div>}
      </div>
      <p>Free slots next week:</p>
      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid lightgray",
      borderRadius: "5px",
      height: "300px",
      overflowY: "scroll"
      }}>
      {freeSlots.length > 0 ? freeSlots.map((d) => (
          <div key={d.slot_date}>
              <div key={d.slot_date}>
                  slot_date - {d.slot_date},
                  duration - {d.duration_id === 1 ? 'MORNING' : d.duration_id === 2 ? 'AFTERNOON' : 'FULL DAY'}
                    <button
                      style={{ marginLeft: "10px", backgroundColor: '#B8F5CE' }}
                      onClick={() => updateBookingH(d.slot_date, 1)}
                      disabled={d.duration_id === 2}>
                        Book First Half
                    </button>
                    <button
                      style={{ marginLeft: "10px", backgroundColor: '#B8F5CE' }}
                      onClick={() => updateBookingH(d.slot_date, 2)}
                      disabled={d.duration_id === 1}>
                        Book Second Half
                    </button>
                    <button
                      style={{ marginLeft: "10px", backgroundColor: '#B8F5CE' }}
                      onClick={() => updateBookingH(d.slot_date, 3)}
                      disabled={d.duration_id === 1 || d.duration_id === 2}>
                        Book Full Day
                    </button>
              </div>
          </div>
      )) : <div>No Free Slots available currently. Reload table.</div>}
      </div>

      <h3>Delete Booking</h3>
      <input id="booking_delete_id" placeholder="Booking ID" />
      <button onClick={handleDeleteBooking} style={{marginLeft: 20, marginBottom:50, height: 40, backgroundColor: 'red', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Delete</button>
    </div>
  );
}

export default MemberBookingManagement
