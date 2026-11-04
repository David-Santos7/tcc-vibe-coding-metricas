"use strict";

const { Appointment } = require("../domain/Appointment");
const {
  assertAppointmentIsNotInPast,
} = require("../domain/isAppointmentInPast");
const { AppointmentConflictError } = require("../domain/errors");

class CreateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  async execute(data) {
    const now = this.clock();
    const appointment = Appointment.create(data, { now });
    assertAppointmentIsNotInPast(appointment, now);

    const conflict = await this.appointmentRepository.findByDateTime(
      appointment.appointmentDate,
      appointment.appointmentTime,
    );
    if (conflict) {
      throw new AppointmentConflictError();
    }

    return this.appointmentRepository.create(appointment);
  }
}

module.exports = { CreateAppointment };
