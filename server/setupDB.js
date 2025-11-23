/*
this file creates the database tables if they do not already exist
*/

const db = require('./db');

const schema = `
CREATE TABLE IF NOT EXISTS zones (
  zone_id INTEGER PRIMARY KEY,
  zone_name TEXT NOT NULL,
  floor INTEGER,
  description TEXT
);

CREATE TABLE IF NOT EXISTS members (
  member_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  membership_type TEXT,
  join_date DATE,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS durations (
  duration_id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS desks (
  desk_id INTEGER PRIMARY KEY,
  desk_code TEXT NOT NULL,
  zone_id INTEGER,
  features TEXT,
  status TEXT DEFAULT 'available',
  FOREIGN KEY (zone_id) REFERENCES zones(zone_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INTEGER PRIMARY KEY,
  member_id INTEGER,
  desk_id INTEGER,
  duration_id INTEGER,
  booking_date TEXT,
  start_time TEXT,
  end_time TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (member_id) REFERENCES members(member_id),
  FOREIGN KEY (desk_id) REFERENCES desks(desk_id),
  FOREIGN KEY (duration_id) REFERENCES durations(duration_id)
);


CREATE TABLE IF NOT EXISTS checkins (
  checkin_id INTEGER PRIMARY KEY,
  booking_id INTEGER,
  checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  auto_released BOOLEAN DEFAULT 0,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
`;

console.log("Executing schema...");
db.exec(schema);
console.log("Database tables ensured to exist.");

module.exports = db;
