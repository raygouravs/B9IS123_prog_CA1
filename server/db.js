/*

  This file initializes, configures, and exports a SQLite database connection using the 'better-sqlite3' package.
  The main purpose of this file is to decouple the database logic from the business logic.

  References:
   - NPM (no date) 'better-sqlite3' package page, available at: https://www.npmjs.com/package/better-sqlite3
*/

/*
const Database = require('better-sqlite3');
const db = new Database('./database/app.db');

module.exports = db;
*/


const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'database', 'app.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath, {
  verbose: console.log // for SQL queries debugging
});

module.exports = db;

