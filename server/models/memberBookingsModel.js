const db = require('../db');

/*
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

module.exports = {
  createBooking(booking) {
    const insert = db.prepare(`
      INSERT INTO bookings (member_id, desk_id, duration_id, booking_date, start_time, end_time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((booking) => {
        insert.run(booking.member_id, booking.desk_id, booking.duration_id, booking.booking_date, booking.start_time, booking.end_time, booking.status, booking.created_at);
    });

    transaction(booking);
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
        // No rows updated, ID does not exist
        return { message: `Booking ${booking_id} not found!` };
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

    return { message: `Booking ${id} deleted successfully` };
  }
};






