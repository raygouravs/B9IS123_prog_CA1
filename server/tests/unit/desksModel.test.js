/*
    Reference: The mock-data setup by mocking the db to an in-memory database has been referenced from Chat-GPT (Lines: 8-35);
*/

const Database = require('better-sqlite3');
const desksModel = require('../../models/desksModel.js');

jest.mock('../../db', () => new (require('better-sqlite3'))(':memory:'));

const db = require('../../db');

describe("getAllDesks() isolated DB test", () => {

    beforeAll(() => {
        db.exec(`
            CREATE TABLE desks (desk_id INTEGER PRIMARY KEY, desk_code TEXT, zone_id INTEGER, features TEXT, status TEXT);
        `);
    });

    beforeEach(() => {
        db.exec(`
            DELETE FROM desks;
        `);
        db.prepare(`INSERT INTO desks VALUES (1, 'CUBICLE', 2, 'cubicle', 'available')`).run();
        db.prepare(`INSERT INTO desks VALUES (2, 'CUBICLE', 3, 'cubicle', 'available')`).run();
        db.prepare(`INSERT INTO desks VALUES (3, 'WORKSTATION', 2, 'workstation', 'available')`).run();
        db.prepare(`INSERT INTO desks VALUES (4, 'WORKSTATION', 3, 'workstation', 'available')`).run();
    });

    // test 1: getAllDesks() should get list of all desks -
    test("getAllDesks() should get list of all desks", () => {
        const result = desksModel.getAllDesks();

        //check if the rows have 'desk_code' attribute
        expect(result[0]).toHaveProperty('desk_code');
        //check if the desks table has 4 rows
        expect(db.prepare("SELECT * FROM desks").all()).toHaveLength(4);
        //check if each row is available
        result.forEach(row => {
            expect(row.status).toBe("available");
        });
    });

    // test 2: deleteDesk(id) should throw error if desk_id is not found -
    test("deleteDesk(id) should throw error if desk_id is not found", () => {
        const desk_id = 100;

        const result = desksModel.deleteDesk(desk_id);
        
        //check if error is returned
        expect(result).toEqual({ message: `Desk ${desk_id} not found!` });
    });
});
