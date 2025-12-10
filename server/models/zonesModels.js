const db = require('../db');

module.exports = {
  // function to create a zone
  createZones(zones) {
    const insert = db.prepare(`
      INSERT INTO zones (zone_id, zone_name, floor, description)
      VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction((zoneList) => {
      zoneList.forEach((z) => {
        insert.run(z.zone_id, z.zone_name, z.floor, z.description);
      });
    });

    transaction(zones);
    return { message: `${zones.length} zones created successfully` };
  },

  // function to get all zones
  getAllZones() {
    const stmt = db.prepare(`SELECT * FROM zones`);
    return stmt.all();
  },

  // function to udpate a zone
  updateZone(id, zone){
    const zone_id = id;
    const { zone_name, floor, description } = zone;

    var fields = [];
    var values = [];

    if(zone_name != undefined) {
      fields.push(`zone_name = ?`);
      values.push(zone_name);
    }
    if (floor != undefined) {
      fields.push(`floor = ?`);
      values.push(floor);
    }
    if (description != undefined) {
      fields.push(`description = ?`);
      values.push(description);
    }

    const stmt = db.prepare(`UPDATE zones SET ${fields.join(', ')} WHERE zone_id = ?`);
    stmt.run([...values, zone_id]);
    //stmt.run(...values, zone_id);
    return { message: `Zone ${zone_id} updated successfully` };
  },

  // function to delete a zone by ID
  deleteZone(id) {
    const stmt = db.prepare(`DELETE FROM zones WHERE zone_id = ?`);
    stmt.run(id);
    return { message: `Zone ${id} deleted successfully` };
  }
};




