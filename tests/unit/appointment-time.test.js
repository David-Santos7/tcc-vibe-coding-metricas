"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  assertAppointmentIsNotInPast,
  isAppointmentInPast,
  localDateTime,
} = require("../../src/domain/isAppointmentInPast");
const { ValidationError } = require("../../src/domain/errors");

test("compares appointment time against the Sao Paulo wall clock", () => {
  const now = new Date("2026-01-15T20:00:45.000Z");

  assert.equal(localDateTime(now), "2026-01-15T17:00");
  assert.equal(
    isAppointmentInPast(
      { appointmentDate: "2026-01-15", appointmentTime: "16:59" },
      now,
    ),
    true,
  );
  assert.equal(
    isAppointmentInPast(
      { appointmentDate: "2026-01-15", appointmentTime: "17:00" },
      now,
    ),
    false,
  );
  assert.equal(
    isAppointmentInPast(
      { appointmentDate: "2026-01-16", appointmentTime: "00:00" },
      now,
    ),
    false,
  );
});

test("raises a domain validation error for past times and rejects invalid clocks", () => {
  assert.throws(
    () =>
      assertAppointmentIsNotInPast(
        { appointmentDate: "2026-01-15", appointmentTime: "16:59" },
        new Date("2026-01-15T20:00:00.000Z"),
      ),
    ValidationError,
  );
  assert.throws(() => localDateTime(new Date(Number.NaN)), TypeError);
});
