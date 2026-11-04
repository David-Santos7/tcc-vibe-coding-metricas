"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const request = require("supertest");
const { startServer } = require("../../src/main/server");

test("starts the HTTP server with an isolated in-memory database", async (t) => {
  const logs = [];
  const { server, database } = startServer({
    port: 0,
    filename: ":memory:",
    logger: {
      log: (message) => logs.push(message),
      error: (error) => {
        throw error;
      },
    },
  });
  await once(server, "listening");

  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    database.close();
  });

  await request(server).get("/").expect(200);
  assert.equal(logs.length, 1);
});

test("rejects an invalid server port before opening a database", () => {
  assert.throws(() => startServer({ port: 65536 }), RangeError);
});
