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
  }
};






