"use strict";

const { AppointmentNotFoundError } = require("../domain/errors");

class GetAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    return appointment;
  }
}

module.exports = { GetAppointment };
