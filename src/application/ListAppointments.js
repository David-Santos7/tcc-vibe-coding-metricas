"use strict";

class ListAppointments {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute() {
    return this.appointmentRepository.list();
  }
}

module.exports = { ListAppointments };
