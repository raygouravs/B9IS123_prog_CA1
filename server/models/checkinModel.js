const db = require('../db');

module.exports = {
  // the following function creates a checkin for the selected booking, setting the status of booking as `checkedin`
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






