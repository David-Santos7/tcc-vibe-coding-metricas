"use strict";

const { AppointmentNotFoundError } = require("../domain/errors");

class DeleteAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id) {
    const deleted = await this.appointmentRepository.delete(id);
    if (!deleted) {
      throw new AppointmentNotFoundError(id);
    }
  }
}

module.exports = { DeleteAppointment };
