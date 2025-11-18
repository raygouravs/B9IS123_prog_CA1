const db = require('../db');

module.exports = {
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

  getAllZones() {
    const stmt = db.prepare(`SELECT * FROM zones`);
    return stmt.all();
  }
};




