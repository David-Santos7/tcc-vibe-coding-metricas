"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  CreateAppointment,
} = require("../../src/application/CreateAppointment");
const { ValidationError } = require("../../src/domain/errors");

test("rejects an appointment earlier than the current time in Sao Paulo", async () => {
  const appointmentRepository = {
    create: async (appointment) => appointment,
  };
  const createAppointment = new CreateAppointment({
    appointmentRepository,
    clock: () => new Date("2026-01-15T16:30:45-03:00"),
  });

  await assert.rejects(
    () =>
      createAppointment.execute({
        clientName: "Ana",
        service: "Consulta",
        appointmentDate: "2026-01-15",
        appointmentTime: "16:29",
        notes: "",
      }),
    ValidationError,
  );
});
