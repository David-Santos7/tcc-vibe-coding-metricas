"use strict";

const { CreateAppointment } = require("../application/CreateAppointment");
const { DeleteAppointment } = require("../application/DeleteAppointment");
const { GetAppointment } = require("../application/GetAppointment");
const { ListAppointments } = require("../application/ListAppointments");
const { UpdateAppointment } = require("../application/UpdateAppointment");
const {
  assertAppointmentRepository,
} = require("../application/repositories/AppointmentRepository");
const { createDatabase } = require("../infrastructure/database/database");
const {
  SQLiteAppointmentRepository,
} = require("../infrastructure/repositories/SQLiteAppointmentRepository");
const {
  appointmentController,
} = require("../presentation/controllers/appointmentController");
const { createApp } = require("./app");

function createCompositionRoot({
  database = createDatabase(),
  clock = () => new Date(),
  logger = console,
} = {}) {
  const appointmentRepository = assertAppointmentRepository(
    new SQLiteAppointmentRepository(database),
  );
  const useCases = {
    createAppointment: new CreateAppointment({
      appointmentRepository,
      clock,
    }),
    deleteAppointment: new DeleteAppointment({ appointmentRepository }),
    getAppointment: new GetAppointment({ appointmentRepository }),
    listAppointments: new ListAppointments({ appointmentRepository }),
    updateAppointment: new UpdateAppointment({
      appointmentRepository,
      clock,
    }),
  };
  const controller = appointmentController(useCases);
  const app = createApp({ controller, logger });

  return { app, database, appointmentRepository, useCases };
}

module.exports = { createCompositionRoot };
