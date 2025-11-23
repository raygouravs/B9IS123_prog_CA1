const db = require('../db');

/*
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
*/

/*
MEMBERSHIP TYPES:
- 'individual'
- 'corporate'
- 'student'
- 'admin'
*/

module.exports = {
  createMember(member) {
    const insert = db.prepare(`
      INSERT INTO members (full_name, email, phone, company, membership_type, join_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((member) => {
        insert.run(member.full_name, member.email, member.phone, member.company, member.membership_type, member.join_date, member.status);
    });

    transaction(member);
    return { message: `Member created successfully!` };
  }

};






