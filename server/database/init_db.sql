-- Zones table (created first as it's referenced by desks)
CREATE TABLE zones (
  zone_id INTEGER PRIMARY KEY,
  zone_name TEXT NOT NULL,
  floor INTEGER,
  description TEXT
);

-- Members table (created before bookings as it's referenced)
CREATE TABLE members (
  member_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  membership_type TEXT,
  join_date DATE,
  status TEXT DEFAULT 'active'
);

-- Durations table (created before bookings as it's referenced)
CREATE TABLE durations (
  duration_id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

-- Desks table
CREATE TABLE desks (
  desk_id INTEGER PRIMARY KEY,
  desk_code TEXT NOT NULL,
  zone_id INTEGER,
  features TEXT,
  status TEXT DEFAULT 'available',
  FOREIGN KEY (zone_id) REFERENCES zones(zone_id)
);

-- Bookings table (created last as it references other tables)
CREATE TABLE bookings (
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




