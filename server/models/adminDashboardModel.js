const db = require('../db');
const { all } = require('../routes/zonesRoutes');

module.exports = {
    //future improvements scope: can be modified for extended date_range...
    getDeskUtilisationByDate(date_str) {
        //Step 1: get total desks count
        const select = db.prepare(`
            SELECT * FROM desks
        `);
        const all_desks = select.all();
        const total_desks_count = all_desks.length;

        //Step 2: from desk_availability_logs: find number of unique desk_ids, searching by the date_str
        const stmt = db.prepare(`
            SELECT DISTINCT desk_id
            FROM desk_availability_logs
            WHERE booking_date = ?
        `);
        const booked_desks = stmt.all(date_str); 
        const booked_desks_count = booked_desks.length;

        //Step 3: Booked = unique desk_ids (from Step 2); Available = Total (from Step 1) - Booked (from Step 2)
        const booked_count = booked_desks_count;
        const available_count = total_desks_count - booked_desks_count;
        const booked_percentage = (booked_desks_count/total_desks_count) * 100;
        const available_percentage = (available_count/total_desks_count) * 100;

        return {
            booked_count: booked_count,
            available_count: available_count,
            booked_percentage: booked_percentage,
            available_percentage: available_percentage
        };
    },

    getMemberUtilisationData() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last_week_date = new Date(today);
        last_week_date.setDate(today.getDate() - 7);

        const format = (d) => d.toISOString().split("T")[0];
        const startDate = format(last_week_date);
        const endDate = format(today);

        const perMemberStmt = db.prepare(`
            SELECT member_id, COUNT(*) AS slots_booked_last_week
            FROM bookings
            WHERE booking_date BETWEEN ? AND ?
            GROUP BY member_id
        `);

        const perMember = perMemberStmt.all(startDate, endDate);
        if(perMember.length === 0) {
            return {message: "No data found!"}
        }

        const total = 10;
        
        const result = perMember.map((row) => {
            const util_percentage = (row.slots_booked_last_week/total)*100;
            return {
                member_id: row.member_id,
                slots_booked_last_week: row.slots_booked_last_week,
                total_slots_last_week: total,
                util_percentage,
                anomaly: util_percentage > 100
            }
        });

       return result;
    }
};

