const db = require('../db');

/*
CREATE TABLE IF NOT EXISTS checkins (
  checkin_id INTEGER PRIMARY KEY,
  booking_id INTEGER,
  checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  auto_released BOOLEAN DEFAULT 0,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
*/

module.exports = {
  createCheckin(checkin) {
    const insert = db.prepare(`
      INSERT INTO checkins (booking_id, checkin_time, auto_released)
      VALUES (?, ?, ?)
    `);

    const transaction = db.transaction((checkin) => {
        insert.run(checkin.booking_id, checkin.checkin_time, checkin.auto_released);
    });

    transaction(checkin);

    const updateQueryStmt = `UPDATE bookings SET status = ? WHERE booking_id = ?`;
    const update = db.prepare(updateQueryStmt);

    const updTrn = db.transaction((checkin) => {
      update.run("checkedin", checkin.booking_id);
    });

    updTrn(checkin);

    return { message: `Checkin created successfully!` };
  },
};






