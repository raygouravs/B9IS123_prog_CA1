/*
this file is for debugging puposes only
*/

const db = require('./db');

// Example seeds
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

// Run seeds
seedMembersIfMissing();

console.log("Seeding complete.");
