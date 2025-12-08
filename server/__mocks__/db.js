const Database = require("better-sqlite3");

const mockDb = new Database(":memory:");
module.exports = mockDb;
