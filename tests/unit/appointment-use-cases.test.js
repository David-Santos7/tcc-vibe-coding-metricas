"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  CreateAppointment,
} = require("../../src/application/CreateAppointment");
const {
  DeleteAppointment,
} = require("../../src/application/DeleteAppointment");
const { GetAppointment } = require("../../src/application/GetAppointment");
const { ListAppointments } = require("../../src/application/ListAppointments");
const {
  UpdateAppointment,
} = require("../../src/application/UpdateAppointment");
const {
  AppointmentConflictError,
  AppointmentNotFoundError,
  ValidationError,
} = require("../../src/domain/errors");
const {
  InMemoryAppointmentRepository,
} = require("../doubles/InMemoryAppointmentRepository");

const clock = () => new Date("2026-01-15T12:00:00.000Z");
const futureAppointment = {
  clientName: "Ana",
  service: "Consulta",
  appointmentDate: "2026-01-16",
  appointmentTime: "10:00",
  notes: "",
};

test("creates appointments and rejects a conflicting date and time", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const useCase = new CreateAppointment({ appointmentRepository, clock });
  const created = await useCase.execute(futureAppointment);

  assert.equal(created.clientName, "Ana");
  await assert.rejects(
    () => useCase.execute({ ...futureAppointment, clientName: "Bia" }),
    AppointmentConflictError,
  );
  assert.equal((await appointmentRepository.list()).length, 1);
});

test("rejects past appointments and invalid domain input before persistence", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const useCase = new CreateAppointment({ appointmentRepository, clock });

  await assert.rejects(
    () =>
      useCase.execute({
        ...futureAppointment,
        appointmentDate: "2026-01-15",
        appointmentTime: "08:00",
      }),
    ValidationError,
  );
  await assert.rejects(
    () => useCase.execute({ ...futureAppointment, service: " " }),
    ValidationError,
  );
  assert.equal((await appointmentRepository.list()).length, 0);
});

test("gets appointments and reports missing identifiers", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const appointment = await new CreateAppointment({
    appointmentRepository,
    clock,
  }).execute(futureAppointment);
  const useCase = new GetAppointment({ appointmentRepository });

  assert.equal((await useCase.execute(appointment.id)).id, appointment.id);
  await assert.rejects(
    () => useCase.execute("missing"),
    AppointmentNotFoundError,
  );
});

test("lists appointments through the repository contract", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const useCase = new CreateAppointment({ appointmentRepository, clock });
  await useCase.execute(futureAppointment);
  await useCase.execute({
    ...futureAppointment,
    appointmentDate: "2026-01-17",
    clientName: "Bia",
  });

  const appointments = await new ListAppointments({
    appointmentRepository,
  }).execute();

  assert.equal(appointments.length, 2);
  assert.deepEqual(
    appointments.map((appointment) => appointment.clientName),
    ["Ana", "Bia"],
  );
});

test("updates an appointment without conflicting with its own time", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const created = await new CreateAppointment({
    appointmentRepository,
    clock,
  }).execute(futureAppointment);
  const useCase = new UpdateAppointment({ appointmentRepository, clock });
  const updated = await useCase.execute(created.id, {
    ...futureAppointment,
    clientName: "Ana atualizada",
  });

  assert.equal(updated.id, created.id);
  assert.equal(updated.createdAt, created.createdAt);
  assert.equal(updated.updatedAt, created.updatedAt);
  assert.equal(updated.clientName, "Ana atualizada");
});

test("rejects update conflicts, past times, and missing appointments", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const createAppointment = new CreateAppointment({
    appointmentRepository,
    clock,
  });
  const first = await createAppointment.execute(futureAppointment);
  const second = await createAppointment.execute({
    ...futureAppointment,
    appointmentDate: "2026-01-17",
    clientName: "Bia",
  });
  const useCase = new UpdateAppointment({ appointmentRepository, clock });

  await assert.rejects(
    () => useCase.execute(second.id, futureAppointment),
    AppointmentConflictError,
  );
  await assert.rejects(
    () =>
      useCase.execute(first.id, {
        ...futureAppointment,
        appointmentDate: "2026-01-15",
        appointmentTime: "08:00",
      }),
    ValidationError,
  );
  await assert.rejects(
    () => useCase.execute("missing", futureAppointment),
    AppointmentNotFoundError,
  );
});

test("deletes an appointment and reports when it does not exist", async () => {
  const appointmentRepository = new InMemoryAppointmentRepository();
  const created = await new CreateAppointment({
    appointmentRepository,
    clock,
  }).execute(futureAppointment);
  const useCase = new DeleteAppointment({ appointmentRepository });

  await useCase.execute(created.id);
  await assert.rejects(
    () => useCase.execute(created.id),
    AppointmentNotFoundError,
  );
});
