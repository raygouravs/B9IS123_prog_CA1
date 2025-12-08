/*
    Reference: The mock-data setup by mocking the db has been referenced from Chat-GPT (Lines: 8-35);
*/

const Database = require('better-sqlite3');
const systemModel = require('../../models/adminSystemModel.js');

jest.mock('../../db', () => new (require('better-sqlite3'))(':memory:'));

const db = require('../../db');

describe("systemReset() isolated DB test", () => {

    beforeAll(() => {
        db.exec(`
            CREATE TABLE checkins (id INTEGER PRIMARY KEY, user TEXT);
            CREATE TABLE bookings (id INTEGER PRIMARY KEY, user TEXT);
            CREATE TABLE desk_availability_logs (id INTEGER PRIMARY KEY, desk_id INTEGER, status TEXT);
            CREATE TABLE desks (desk_id INTEGER PRIMARY KEY, status TEXT);
        `);
    });

    beforeEach(() => {
        db.exec(`
            DELETE FROM checkins;
            DELETE FROM bookings;
            DELETE FROM desk_availability_logs;
            DELETE FROM desks;
        `);

        db.prepare(`INSERT INTO checkins (user) VALUES ('Alice')`).run();
        db.prepare(`INSERT INTO bookings (user) VALUES ('Bob')`).run();
        db.prepare(`INSERT INTO desk_availability_logs (desk_id, status) VALUES (1, 'busy')`).run();
        db.prepare(`INSERT INTO desks (status) VALUES ('busy')`).run();
    });

    // test 1: systemReset() should release all resources -
    test("systemReset() clears everything", () => {

        const result = systemModel.systemReset();

        expect(result).toEqual({
            message: "System Reset completed. All resources returned to open pool!"
        });

        expect(db.prepare("SELECT * FROM checkins").all()).toHaveLength(0);
        expect(db.prepare("SELECT * FROM bookings").all()).toHaveLength(0);
        expect(db.prepare("SELECT * FROM desk_availability_logs").all()).toHaveLength(0);

        const desks = db.prepare("SELECT * FROM desks").all();
        desks.forEach(row => {
            expect(row.status).toBe("available");
        });
    });
});
