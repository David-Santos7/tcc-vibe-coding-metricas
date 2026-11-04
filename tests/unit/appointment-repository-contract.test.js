"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  APPOINTMENT_REPOSITORY_METHODS,
  assertAppointmentRepository,
} = require("../../src/application/repositories/AppointmentRepository");
const {
  InMemoryAppointmentRepository,
} = require("../doubles/InMemoryAppointmentRepository");

test("accepts a repository implementing the application contract", () => {
  const repository = new InMemoryAppointmentRepository();

  assert.equal(assertAppointmentRepository(repository), repository);
  assert.deepEqual(APPOINTMENT_REPOSITORY_METHODS, [
    "create",
    "findById",
    "findByDateTime",
    "list",
    "update",
    "delete",
  ]);
});

test("rejects a repository with missing methods", () => {
  assert.throws(
    () => assertAppointmentRepository({ create() {} }),
    /Métodos ausentes: findById, findByDateTime, list, update, delete/,
  );
});
