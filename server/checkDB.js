/*
this file is for debugging puposes only
*/

const db = require('./db');

// Seed Members
const seedMembers = [
  { member_id: 1, full_name: "Admin User", email: "admin@example.com", phone: "0890890893", company: "CoCreate", membership_type: "lifetime", join_date: "2023-01-01", status: "active"}
];


// Insert member only if email does not exist
function seedMembersIfMissing() {
  const selectStmt = db.prepare("SELECT * FROM members WHERE email = ?");
  const insertStmt = db.prepare("INSERT INTO members (member_id, full_name, email, phone, company, membership_type, join_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

  seedMembers.forEach(member => {
    const exists = selectStmt.get(member.email);
    if (!exists) {
      insertStmt.run(member.member_id, member.full_name, member.email, member.phone, member.company, member.membership_type, member.join_date, member.status);
      console.log(`Inserted member → ${member.email}`);
    } else {
      console.log(`Already exists → ${member.email}`);
    }
  });
}


// Seed Durations
const durationsMasterData = [
  { duration_id: 1, label: "MORNING", start_time: "08:00", end_time: "12:00"},
  { duration_id: 2, label: "AFTERNOON", start_time: "13:00", end_time: "17:00"},
  { duration_id: 3, label: "FULLDAY", start_time: "08:00", end_time: "17:00"}
] 

// Insert Master Data
function seedDurationsIfMissing() {
  const selectStmt = db.prepare("SELECT * FROM durations WHERE duration_id = ?");
  const insertStmt = db.prepare("INSERT INTO durations (duration_id, label, start_time, end_time) VALUES (?, ?, ?, ?)");

  durationsMasterData.forEach(duration => {
    const exists = selectStmt.get(duration.duration_id);
    if (!exists) {
      insertStmt.run(duration.duration_id, duration.label, duration.start_time, duration.end_time);
      console.log(`Inserted duration → ${duration.label}`);
    } else {
      console.log(`Already exists → ${duration.label}`);
    }
  });
}

function viewMasterData(){

  const selectStmt = db.prepare("SELECT * from durations");
  const durations = selectStmt.all();
  console.log("Durations:");
  console.log(durations);

}

function viewZonesData(){

  const selectStmt = db.prepare("SELECT * from zones");
  const zones = selectStmt.all();
  console.log("Zones:");
  console.log(zones);

}

function viewMemberBookings(){

  const selectStmt = db.prepare("SELECT * from bookings");
  const bookings = selectStmt.all();
  console.log("Bookings:");
  console.log(bookings);

}

function viewDeskAvailLogsTable(){

  const selectStmt = db.prepare("SELECT * from desk_availability_logs");
  const desk_logs = selectStmt.all();
  console.log("Desk availability logs ->");
  console.log(desk_logs);

}


//MARK: Run seeds

//seedMembersIfMissing();
//seedDurationsIfMissing();

// View the Master Data table (Durations) -
// viewMasterData();


// View the Zones data - 
// viewZonesData();


// View the Bookings - 
//viewMemberBookings();

// View the Desk avail. logs - 
viewDeskAvailLogsTable()

console.log("Seeding complete.");
