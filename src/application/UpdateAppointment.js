"use strict";

const { Appointment } = require("../domain/Appointment");
const {
  assertAppointmentIsNotInPast,
} = require("../domain/isAppointmentInPast");
const {
  AppointmentConflictError,
  AppointmentNotFoundError,
} = require("../domain/errors");

class UpdateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  async execute(id, data) {
    const existing = await this.appointmentRepository.findById(id);
    if (!existing) {
      throw new AppointmentNotFoundError(id);
    }

    const now = this.clock();
    const appointment = Appointment.update(existing, data, now);
    assertAppointmentIsNotInPast(appointment, now);

    const conflict = await this.appointmentRepository.findByDateTime(
      appointment.appointmentDate,
      appointment.appointmentTime,
      id,
    );
    if (conflict) {
      throw new AppointmentConflictError();
    }

    return this.appointmentRepository.update(appointment);
  }
}

module.exports = { UpdateAppointment };
