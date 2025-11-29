const db = require('../db');

/*
TABLE SCHEMA FOR REFERENCE:
CREATE TABLE IF NOT EXISTS bookings (
  booking_id INTEGER PRIMARY KEY,
  member_id INTEGER,
  desk_id INTEGER,
  duration_id INTEGER,
  booking_date DATE,
  start_time TIME,
  end_time TIME,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(member_id),
  FOREIGN KEY (desk_id) REFERENCES desks(desk_id),
  FOREIGN KEY (duration_id) REFERENCES durations(duration_id)
);
*/

/*
BOOKING STATUS -
- pending
- completed
*/

/*
TABLE SCHEMA FOR REFERENCE:
CREATE TABLE IF NOT EXISTS desk_availability_logs (
  desk_id INTEGER PRIMARY KEY,
  booking_date TEXT,
  first_half_booked BOOLEAN DEFAULT 0,
  second_half_booked BOOLEAN DEFAULT 0
);
*/

module.exports = {
  createBooking(booking) {
    const insert = db.prepare(`
      INSERT INTO bookings (member_id, desk_id, duration_id, booking_date, start_time, end_time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const updateDesk = db.prepare(`UPDATE desks SET status = ? WHERE desk_id = ?`)

    const transaction = db.transaction((booking) => {
        insert.run(booking.member_id, booking.desk_id, booking.duration_id, booking.booking_date, booking.start_time, booking.end_time, booking.status, booking.created_at);
        updateDesk.run("occupied", booking.desk_id);
    });

    transaction(booking);

    //MARK: inserting into desk_availability_logs
    const insert_logs = db.prepare(`
      INSERT INTO desk_availability_logs (desk_id, booking_date, first_half_booked, second_half_booked)
      VALUES (?, ?, ?, ?)
    `);

    const first_half_booked = 0;
    const second_half_booked = 0;
    if (booking.duration_id == 1){
      first_half_booked = 1;
      second_half_booked = 0;
    } else if(booking.duration_id == 2){
      first_half_booked = 0;
      second_half_booked = 1;
    } else if(booking.duration_id == 3){
      first_half_booked = 1;
      second_half_booked = 1;
    }

    const transaction_logs = db.transaction((booking) => {
        insert_logs.run(booking.desk_id, booking.booking_date, first_half_booked, second_half_booked);
    });

    transaction_logs(booking);

    return { message: `Booking created successfully!` };
  }, 

  getAllBookings() {
    const select = db.prepare(`
      SELECT * FROM bookings
    `);

    const bookings = select.all();
    return bookings;
  },

  getBookingByID(id) {
    const select = db.prepare(`
      SELECT * FROM bookings where booking_id = ?
    `);

    const booking = select.get(id);
    if (!booking) {
        return { message: `Booking ${id} not found!` };
    }

    return booking;
  },

  updateBooking(id, booking){
    const booking_id = id;
    const { member_id, desk_id, duration_id, booking_date, start_time, end_time, status, created_at } = booking;

    var fields = [];
    var values = [];

    if(member_id != undefined) {
      fields.push(`member_id = ?`);
      values.push(member_id);
    }
    if(desk_id != undefined) {
      fields.push(`desk_id = ?`);
      values.push(desk_id);
    }
    if(duration_id != undefined) {
      fields.push(`duration_id = ?`);
      values.push(duration_id);
    }
    if(booking_date != undefined) {
      fields.push(`booking_date = ?`);
      values.push(booking_date);
    }
    if(start_time != undefined) {
      fields.push(`start_time = ?`);
      values.push(start_time);
    }
    if(end_time != undefined) {
      fields.push(`end_time = ?`);
      values.push(end_time);
    }
    if(status != undefined) {
      fields.push(`status = ?`);
      values.push(status);
    }
    if(created_at != undefined) {
      fields.push(`created_at = ?`);
      values.push(created_at);
    }

    const stmt = db.prepare(`UPDATE bookings SET ${fields.join(', ')} WHERE booking_id = ?`);
    const result = stmt.run([...values, booking_id]);
    if (result.changes === 0) {
        // IF No rows updated, ID does not exist error
        return { message: `Booking ${booking_id} not found!` };
    }

    // DELETION from desks_availability_logs
    const desk_id_logs = db.prepare(`SELECT desk_id FROM bookings WHERE booking_id = ?`).run(booking_id);
    const booking_date_logs = db.prepare(`SELECT booking_date FROM bookings WHERE booking_id = ?`).run(booking_id);

    const delete_logs = db.prepare(`
      DELETE FROM desks_availability_logs WHERE desk_id = ? AND booking_date = ?
      `);

    const transaction_del_logs = db.transaction((desk_id_logs, booking_date_logs) => {
      const result = delete_logs.run([desk_id_logs, booking_date_logs]);
      return result;
    });

    const result_del_logs = transaction_del_logs(desk_id_logs, booking_date_logs);
    if (result_del_logs.changes === 0) {
      return { message: `DELETION FROM desks_availability_logs NOT SUCCESSFUL!` };
    }

    // INSERT into desks_availability_logs
    const insert_logs = db.prepare(`
      INSERT INTO desk_availability_logs (desk_id, booking_date, first_half_booked, second_half_booked)
      VALUES (?, ?, ?, ?)
    `);

    const duration_id_logs = db.prepare(`SELECT duration_id FROM bookings WHERE booking_id = ?`).run(booking_id);

    const first_half_booked = 0;
    const second_half_booked = 0;
    if (duration_id_logs == 1){
      first_half_booked = 1;
      second_half_booked = 0;
    } else if(duration_id_logs == 2){
      first_half_booked = 0;
      second_half_booked = 1;
    } else if(duration_id_logs == 3){
      first_half_booked = 1;
      second_half_booked = 1;
    }

    const transaction_ins_logs = db.transaction((desk_id_logs, booking_date_logs, first_half_booked, second_half_booked) => {
        insert_logs.run(desk_id_logs, booking_date_logs, first_half_booked, second_half_booked);
    });

    const result_ins_logs = transaction_ins_logs(desk_id_logs, booking_date_logs, first_half_booked, second_half_booked);
    if (result_ins_logs.changes === 0) {
      return { message: `INSERTION INTO desks_availability_logs NOT SUCCESSFUL!` };
    }

    return { message: `Booking ${booking_id} updated successfully` };
  },

  deleteBooking(id) {
    const deleteCheckins = db.prepare(`
      DELETE FROM checkins WHERE booking_id = ?
    `);

    const deleteBooking = db.prepare(`
      DELETE FROM bookings WHERE booking_id = ?
    `);

    const transaction = db.transaction((id) => {
      deleteCheckins.run(id);
      const result = deleteBooking.run(id);
      return result;
    });

    const result = transaction(id);

    if (result.changes === 0) {
      return { message: `Booking ${id} not found!` };
    }

    //deleteBooking: DELETE from desks_availability_logs, for the particular desk_id, booking_date;
    const desk_id = db.prepare(`SELECT desk_id FROM bookings WHERE booking_id = ?`).run(id);
    const booking_date = db.prepare(`SELECT booking_date FROM bookings WHERE booking_id = ?`).run(id);

    const delete_logs = db.prepare(`
      DELETE FROM desks_availability_logs WHERE desk_id = ? AND booking_date = ?
      `);

    const transaction_logs = db.transaction((desk_id, booking_date) => {
      const result = delete_logs.run([desk_id, booking_date]);
      return result;
    });

    const result_logs = transaction_logs(desk_id, booking_date);
    if (result_logs.changes === 0) {
      return { message: `DELETION FROM desks_availability_logs NOT SUCCESSFUL!` };
    }

    return { message: `Booking ${id} deleted successfully` };
  }
};






