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
  }
};






