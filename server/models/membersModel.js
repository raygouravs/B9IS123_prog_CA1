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
  },

  getAllMembers() {
    const select = db.prepare(`
      SELECT * FROM members
    `);

    const members = select.all();
    return members;
  },

  getMemberByID(id) {
    const select = db.prepare(`
      SELECT * FROM members where member_id = ?
    `);

    const member = select.get(id);
    if (!member) {
        return { message: `Member ${id} not found!` };
    }

    return member;
  },

  updateMember(id, member){
    const member_id = id;
    const { full_name, email, phone, company, membership_type, join_date, status } = member;

    var fields = [];
    var values = [];

    console.log("updateMembersAPI- full_name" + full_name);
    console.log("updateMembersAPI- email" + email);
    console.log("updateMembersAPI- phone" + phone);
    console.log("updateMembersAPI- company" + company);
    console.log("updateMembersAPI- membership_type" + membership_type);
    console.log("updateMembersAPI- join_date" + join_date);
    console.log("updateMembersAPI- status" + status);

    if(full_name != undefined && full_name !== "") {
      fields.push(`full_name = ?`);
      values.push(full_name);
    }
    if(email != undefined && email !== "") {
      fields.push(`email = ?`);
      values.push(email);
    }
    if(phone != undefined && phone !== "") {
      fields.push(`phone = ?`);
      values.push(phone);
    }
    if(company != undefined && company !== "") {
      fields.push(`company = ?`);
      values.push(company);
    }
    if(membership_type != undefined && membership_type !== "") {
      fields.push(`membership_type = ?`);
      values.push(membership_type);
    }
    if(join_date != undefined && join_date !== "") {
      fields.push(`join_date = ?`);
      values.push(join_date);
    }
    if(status != undefined && status !== "") {
      fields.push(`status = ?`);
      values.push(status);
    }

    const stmt = db.prepare(`UPDATE members SET ${fields.join(', ')} WHERE member_id = ?`);
    const result = stmt.run([...values, member_id]);
    if (result.changes === 0) {
        // No rows updated, ID does not exist
        return { message: `Member ${member_id} not found!` };
    }

    return { message: `Member ${member_id} updated successfully` };
  },

  deleteMember(id) {
    const stmt = db.prepare(`
      DELETE FROM members WHERE member_id = ?
    `);

    const result = stmt.run(id);
    if (result.changes === 0) {
        // No rows deleted, ID does not exist
        return { message: `Member ${id} not found!` };
    }

    return { message: `Member ${id} deleted successfully` };
  },

  getMemberIDforLogin(email) {
    const select = db.prepare(`
        SELECT * FROM members WHERE email = ?
      `);
    const result = select.all(email);
    return result;
  }

};






