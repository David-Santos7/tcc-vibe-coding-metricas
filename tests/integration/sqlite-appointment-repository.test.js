"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createDatabase,
} = require("../../src/infrastructure/database/database");
const {
  SQLiteAppointmentRepository,
} = require("../../src/infrastructure/repositories/SQLiteAppointmentRepository");
const { AppointmentConflictError } = require("../../src/domain/errors");

function appointment(id, date, time) {
  return {
    id,
    clientName: `Cliente ${id}`,
    service: "Consulta",
    appointmentDate: date,
    appointmentTime: time,
    notes: "",
    createdAt: "2026-01-15T12:00:00.000Z",
    updatedAt: "2026-01-15T12:00:00.000Z",
  };
}

test("persists, finds, orders, updates, and deletes appointments in SQLite", (t) => {
  const database = createDatabase({ filename: ":memory:" });
  t.after(() => database.close());
  const repository = new SQLiteAppointmentRepository(database);

  repository.create(appointment("later", "2026-01-17", "12:00"));
  repository.create(appointment("earlier", "2026-01-16", "09:30"));

  assert.equal(repository.findById("earlier").clientName, "Cliente earlier");
  assert.equal(repository.findById("missing"), null);
  assert.deepEqual(
    repository.list().map(({ id }) => id),
    ["earlier", "later"],
  );

  repository.update({
    ...repository.findById("earlier"),
    clientName: "Nome atualizado",
    appointmentDate: "2026-01-16",
    appointmentTime: "10:00",
    updatedAt: "2026-01-15T13:00:00.000Z",
  });
  assert.equal(repository.findById("earlier").clientName, "Nome atualizado");
  assert.equal(repository.delete("later"), true);
  assert.equal(repository.delete("later"), false);
});

test("enforces unique date and time and parameterizes identifier lookups", (t) => {
  const database = createDatabase({ filename: ":memory:" });
  t.after(() => database.close());
  const repository = new SQLiteAppointmentRepository(database);

  repository.create(appointment("first", "2026-01-16", "09:30"));
  assert.throws(
    () => repository.create(appointment("second", "2026-01-16", "09:30")),
    AppointmentConflictError,
  );
  assert.equal(repository.findById("' OR 1=1 --"), null);
  assert.equal(repository.findByDateTime("2026-01-16", "09:30", "first"), null);
});

test("maps SQLite unique updates to a domain conflict", (t) => {
  const database = createDatabase({ filename: ":memory:" });
  t.after(() => database.close());
  const repository = new SQLiteAppointmentRepository(database);

  repository.create(appointment("first", "2026-01-16", "09:30"));
  repository.create(appointment("second", "2026-01-16", "10:30"));

  assert.throws(
    () =>
      repository.update({
        ...repository.findById("second"),
        appointmentDate: "2026-01-16",
        appointmentTime: "09:30",
      }),
    AppointmentConflictError,
  );
});
