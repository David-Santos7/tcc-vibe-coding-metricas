"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { Appointment, isRealDate } = require("../../src/domain/Appointment");
const { ValidationError } = require("../../src/domain/errors");

const validData = {
  clientName: "  Ana Silva  ",
  service: "  Consulta  ",
  appointmentDate: "2026-01-16",
  appointmentTime: "10:30",
  notes: "  Levar exames  ",
};

test("creates an appointment with normalized data, UUID, and ISO timestamps", () => {
  const appointment = Appointment.create(validData, {
    now: new Date("2026-01-15T12:00:00.000Z"),
  });

  assert.match(
    appointment.id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  assert.equal(appointment.clientName, "Ana Silva");
  assert.equal(appointment.service, "Consulta");
  assert.equal(appointment.notes, "Levar exames");
  assert.equal(appointment.createdAt, "2026-01-15T12:00:00.000Z");
  assert.equal(appointment.updatedAt, appointment.createdAt);
});

test("requires a nonblank client name and service", () => {
  for (const data of [
    { ...validData, clientName: "   " },
    { ...validData, service: "" },
  ]) {
    assert.throws(() => Appointment.create(data), ValidationError);
  }
});

test("rejects invalid calendar dates and accepts leap days only in leap years", () => {
  for (const date of ["2026-02-29", "2026-04-31", "2026-13-01", "2026-2-01"]) {
    assert.equal(isRealDate(date), false);
    assert.throws(
      () => Appointment.create({ ...validData, appointmentDate: date }),
      ValidationError,
    );
  }

  assert.equal(isRealDate("2024-02-29"), true);
});

test("accepts only a valid 24-hour HH:mm time", () => {
  for (const appointmentTime of ["24:00", "12:60", "9:30", "12:30:00"]) {
    assert.throws(
      () => Appointment.create({ ...validData, appointmentTime }),
      ValidationError,
    );
  }
});

test("allows empty notes up to 500 characters and rejects longer notes", () => {
  assert.equal(
    Appointment.create({ ...validData, notes: "x".repeat(500) }).notes.length,
    500,
  );
  assert.equal(
    Appointment.create({ ...validData, notes: undefined }).notes,
    "",
  );
  assert.throws(
    () => Appointment.create({ ...validData, notes: "x".repeat(501) }),
    ValidationError,
  );
});

test("updates mutable fields while preserving identity and creation time", () => {
  const existing = Appointment.create(validData, {
    id: "existing-id",
    now: new Date("2026-01-15T12:00:00.000Z"),
  });
  const updated = Appointment.update(
    existing,
    { ...validData, clientName: "Beatriz" },
    new Date("2026-01-15T13:00:00.000Z"),
  );

  assert.equal(updated.id, existing.id);
  assert.equal(updated.createdAt, existing.createdAt);
  assert.equal(updated.updatedAt, "2026-01-15T13:00:00.000Z");
  assert.equal(updated.clientName, "Beatriz");
});
