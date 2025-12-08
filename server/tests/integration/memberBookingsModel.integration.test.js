/*
    Reference: The mock-data setup by mocking the db to an in-memory database has been referenced from Chat-GPT (Lines: 8-35);
*/

const request = require("supertest");
const express = require("express");
const session = require("express-session");
const bookingsRoutes = require("../../routes/memberBookingsRoutes");
const Database = require("better-sqlite3");

jest.mock("../../db");
const db = require("../../db");

const app = express();
app.use(express.json());
app.use(session({
  secret: "test-secret",
  resave: false,
  saveUninitialized: true
}));
app.use("/api/bookings", bookingsRoutes);


beforeAll(() => {
  db.exec(`
    PRAGMA foreign_keys = ON;

    DROP TABLE IF EXISTS checkins;
    DROP TABLE IF EXISTS bookings;
    DROP TABLE IF EXISTS desks;

    CREATE TABLE desks (
      desk_id INTEGER PRIMARY KEY,
      desk_code TEXT,
      status TEXT
    );

    CREATE TABLE bookings (
      booking_id INTEGER PRIMARY KEY,
      member_id INTEGER,
      desk_id INTEGER,
      duration_id INTEGER,
      booking_date TEXT,
      start_time TEXT,
      end_time TEXT,
      status TEXT,
      created_at TEXT,
      FOREIGN KEY (desk_id) REFERENCES desks(desk_id)
    );

    CREATE TABLE checkins (
      checkin_id INTEGER PRIMARY KEY,
      booking_id INTEGER,
      checkin_time TEXT,
      FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    );
  `);
});

beforeEach(() => {
  db.exec(`
    DELETE FROM bookings;
    DELETE FROM desks;
  `);
  db.prepare(`INSERT INTO desks VALUES (1, 'CUBICLE', 'available')`).run();
});


describe("createBooking() integration test", () => {
  test("should INSERT into bookings and update desk status", async () => {
    const booking = {
      member_id: 1,
      desk_id: 1,
      duration_id: 3,
      booking_date: "2025-12-10",
      start_time: "09:00",
      end_time: "17:00",
      status: "confirmed",
      created_at: "2025-12-08"
    };

    const res = await request(app)
      .post("/create")
      .send(booking);

    console.log("Controller error:", res.body);

    expect(res.status).toBe(201); 
    expect(res.body.message).toBe("Booking created successfully!");

    const insertedBooking = db.prepare(`SELECT * FROM bookings`).all();
    expect(insertedBooking.length).toBe(1);

    const desk = db.prepare(`SELECT * FROM desks WHERE desk_id = ?`).get();
    expect(desk.status).toBe("occupied");
  });
});

