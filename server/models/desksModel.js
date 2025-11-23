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
  }
};






