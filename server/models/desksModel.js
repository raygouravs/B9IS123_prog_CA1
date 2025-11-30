const db = require('../db');

/*
CREATE TABLE IF NOT EXISTS desks (
  desk_id INTEGER PRIMARY KEY,
  desk_code TEXT NOT NULL,
  zone_id INTEGER,
  features TEXT,
  status TEXT DEFAULT 'available',
  FOREIGN KEY (zone_id) REFERENCES zones(zone_id)
);
*/

/*
DESK CODES - 

1. CUBICLE
2. WORKSTATION
3. CONFERENCE ROOM
4. PRIVATE OFFICE
*/

module.exports = {
  createDesk(desk) {
    const insert = db.prepare(`
      INSERT INTO desks (desk_code, zone_id, features, status)
      VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction((desk) => {
        insert.run(desk.desk_code, desk.zone_id, desk.features, desk.status);
    });

    transaction(desk);
    return { message: `Desk created successfully!` };
  },

  getAllDesks() {
    const select = db.prepare(`
      SELECT * FROM desks
    `);

    const desks = select.all();
    return desks;
  },

  getDeskByID(id) {
    const select = db.prepare(`
      SELECT * FROM desks where desk_id = ?
    `);

    const desk = select.get(id);
    if (!desk) {
        return { message: `Desk ${id} not found!` };
    }

    return desk;
  },

  updateDesk(id, desk){
    const desk_id = id;
    const { desk_code, zone_id, features, status } = desk;

    var fields = [];
    var values = [];

    if(desk_code != undefined) {
      fields.push(`desk_code = ?`);
      values.push(desk_code);
    }
    if(zone_id != undefined) {
      fields.push(`zone_id = ?`);
      values.push(zone_id);
    }
    if(features != undefined) {
      fields.push(`features = ?`);
      values.push(features);
    }
    if(status != undefined) {
      fields.push(`status = ?`);
      values.push(status);
    }

    const stmt = db.prepare(`UPDATE desks SET ${fields.join(', ')} WHERE desk_id = ?`);
    const result = stmt.run([...values, desk_id]);
    if (result.changes === 0) {
        // No rows updated, ID does not exist
        return { message: `Desk ${desk_id} not found!` };
    }

    return { message: `Desk ${desk_id} updated successfully` };
  },

  deleteDesk(id) {
    const stmt = db.prepare(`
      DELETE FROM desks WHERE desk_id = ?
    `);

    const result = stmt.run(id);
    if (result.changes === 0) {
        // No rows deleted, ID does not exist
        return { message: `Desk ${id} not found!` };
    }

    return { message: `Desk ${id} deleted successfully` };
  },

  /*
  getNextWeekFreeSlotsForDeskByID(id) {
    const desk_id = id;
    function getNext7WorkingDays() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const workingDays = [];

      for (let i = 1; workingDays.length < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);

        const day = nextDate.getDay(); // 0 = Sunday, 6 = Saturday

        if (day !== 0 && day !== 6) {
          const formatted = nextDate.toISOString().split("T")[0];
          workingDays.push(formatted);
        }
      }

      return workingDays;
    }

    //get all bookings from desk_availability_logs
    const select = db.prepare(`
       SELECT * FROM desk_availability_logs WHERE desk_id = ?
    `);

    const filtered_bookings = select.all(desk_id);
    
    const next_7_working_days = getNext7WorkingDays();

    let freeSlots = [];

    for(dt in next_7_working_days) {
      console.log("slot date - " + dt);
      console.log("booked dates - " + filtered_bookings);
      if(!filtered_bookings.map(b => b.booking_date).includes(dt)) {
        freeSlots.push({
          "slot_date": dt,
          "duration_id": 3
        });
      } else {
        for(fb in filtered_bookings){
          if(fb.booking_date === dt){
            if(fb.first_half === 1 && fb.second_half === 0) {
              freeSlots.push({
                "slot_date": dt,
                "duration_id": 2
              });
            } else if(fb.first_half === 0 && fb.second_half === 1) {
              freeSlots.push({
                "slot_date": dt,
                "duration_id": 1
              });
            }
          }
        }
      }
    }

    
    // for (dt in next_7_working_days) {
    //   if(!filtered_bookings.map(b => b.booking_date).includes(dt)){
    //     freeSlots.push({
    //       "slot_date": dt,
    //       "duration_id": 3
    //     });
    //   } else {
    //     let booked_slots = [];
    //     for(fb in filtered_bookings) {
    //       if(dt === fb.booking_date){
    //         booked_slots.push(fb.duration_id)
    //       }
    //     }
    //     if(booked_slots.length === 1) {
    //       if(booked_slots[0] === 1) {
    //         freeSlots.push({
    //           "slot_date": dt,
    //           "duration_id": 2
    //         });
    //       } else if(booked_slots[0] === 2) {
    //         freeSlots.push({
    //           "slot_date": dt,
    //           "duration_id": 1
    //         });
    //       }
    //     }
    //   }
    // } 

    return { data: freeSlots }

  }*/

  getNextWeekFreeSlotsForDeskByID(id) {
    const desk_id = id;

    function getNext7WorkingDays() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const workingDays = [];

      for (let i = 1; workingDays.length < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);

        const day = nextDate.getDay();

        if (day !== 0 && day !== 6) {
          const formatted = nextDate.toISOString().split("T")[0];
          workingDays.push(formatted);
        }
      }

      return workingDays;
    }

    //get all desk_availability_logs
    const select = db.prepare(`
       SELECT * FROM desk_availability_logs WHERE desk_id = ?
    `);

    const filtered_bookings = select.all(desk_id);

    console.log(filtered_bookings);

    const next_7_working_days = getNext7WorkingDays();

    let freeSlots = [];

    for (const dt of next_7_working_days) {

      let exists = false;
      for (const fb of filtered_bookings) {
        if (fb.booking_date === dt) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        freeSlots.push({
          slot_date: dt,
          duration_id: 3
        });
      } else {

        for (const fb of filtered_bookings) {
          if (fb.booking_date === dt) {

            if (fb.first_half === 1 && fb.second_half === 0) {
              freeSlots.push({
                slot_date: dt,
                duration_id: 2
              });

            } else if (fb.first_half === 0 && fb.second_half === 1) {
              freeSlots.push({
                slot_date: dt,
                duration_id: 1
              });
            }
          }
        }
      }
    }

    return { data: freeSlots };
},

getAvailableSeatsForDate(date) {
  //fetching list of all_desks...
  const select = db.prepare(`
      SELECT * FROM desks
    `);

  const all_desks = select.all();
  
  const available_seats = [];

  //for each seat - check booking logs in desk_availability_logs...
  all_desks.forEach((desk) => {
    //fetching list of all existing bookings for selected date...
    const select = db.prepare(`
      SELECT * FROM desk_availability_logs WHERE desk_id = ? AND booking_date = ?
    `);

    const all_desk_bookings = select.all(desk.desk_id, date);

    //CASE - booked FULLDAY in single booking
    if(all_desk_bookings.length === 1 && all_desk_bookings[0].first_half === 1 && all_desk_bookings[0].second_half === 1) {
      return;
    }

    //CASE - booked FULLDAY over two bookings
    if(all_desk_bookings.length === 2) {
      return;
    }

    //CASE - booked PARTIALLY (MORNING/AFTERNOON)
    if(all_desk_bookings.length === 1 && all_desk_bookings[0].first_half != all_desk_bookings[0].second_half) {
      available_seats.push({
          "desk_id": desk.desk_id,
          "desk_code": desk.desk_code,
          "zone_id": desk.zone_id,
          "features": desk.features,
          "booking_date": all_desk_bookings[0].booking_date,
          "first_half_booked": all_desk_bookings[0].first_half,
          "second_half_booked": all_desk_bookings[0].second_half
      });
    }

    //CASE - completely FREE
    if(all_desk_bookings.length === 0) {
      available_seats.push({
          "desk_id": desk.desk_id,
          "desk_code": desk.desk_code,
          "zone_id": desk.zone_id,
          "features": desk.features,
          "booking_date": date,
          "first_half_booked": 0,
          "second_half_booked": 0
      });
    }
  });

  let message = "success";
  if(available_seats.length === 0){
    message = "No desks available!"
  }

  return { data: available_seats, message: message }
}

};






