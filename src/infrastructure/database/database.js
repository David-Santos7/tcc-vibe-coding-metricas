"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

const schemaPath = path.join(__dirname, "schema.sql");

function createDatabase({
  filename = path.resolve(__dirname, "../../../data/appointments.db"),
  DatabaseClass = Database,
} = {}) {
  if (filename !== ":memory:") {
    fs.mkdirSync(path.dirname(path.resolve(filename)), { recursive: true });
  }

  const database = new DatabaseClass(filename);
  database.pragma("foreign_keys = ON");
  database.pragma("busy_timeout = 5000");
  database.exec(fs.readFileSync(schemaPath, "utf8"));

  return database;
}

module.exports = { createDatabase };
