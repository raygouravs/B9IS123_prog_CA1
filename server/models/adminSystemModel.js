const db = require('../db');

module.exports = {
    systemReset() {
        
        const transaction = db.transaction(() => {
            //delete all checkins
            const deleteCheckins = db.prepare(`DELETE from checkins`).run();

            //delete all bookings
            const deleteBookings = db.prepare(`DELETE from bookings`).run();

            //delete all desk_availability_logs
            const deleteBookingLogs = db.prepare(`DELETE from desk_availability_logs`).run();

            //free all desks to available
            const freeResources = db.prepare(`UPDATE desks SET status = 'available'`).run();

        });

        transaction();
        console.log('System Reset completed. All resources returned to open pool!');
        return { message: `System Reset completed. All resources returned to open pool!` };
    }
};