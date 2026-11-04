"use strict";

const { AppointmentConflictError } = require("../../src/domain/errors");

class InMemoryAppointmentRepository {
  constructor() {
    this.appointments = new Map();
  }

  async create(appointment) {
    if (
      await this.findByDateTime(
        appointment.appointmentDate,
        appointment.appointmentTime,
      )
    ) {
      throw new AppointmentConflictError();
    }

    this.appointments.set(appointment.id, { ...appointment });
    return this.findById(appointment.id);
  }

  async findById(id) {
    const appointment = this.appointments.get(id);
    return appointment ? { ...appointment } : null;
  }

  async findByDateTime(date, time, excludingId) {
    const appointment = [...this.appointments.values()].find(
      (candidate) =>
        candidate.appointmentDate === date &&
        candidate.appointmentTime === time &&
        candidate.id !== excludingId,
    );
    return appointment ? { ...appointment } : null;
  }

  async list() {
    return [...this.appointments.values()]
      .sort((left, right) =>
        `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
          `${right.appointmentDate}T${right.appointmentTime}`,
        ),
      )
      .map((appointment) => ({ ...appointment }));
  }

  async update(appointment) {
    if (!this.appointments.has(appointment.id)) {
      return null;
    }

    if (
      await this.findByDateTime(
        appointment.appointmentDate,
        appointment.appointmentTime,
        appointment.id,
      )
    ) {
      throw new AppointmentConflictError();
    }

    this.appointments.set(appointment.id, { ...appointment });
    return this.findById(appointment.id);
  }

  async delete(id) {
    return this.appointments.delete(id);
  }
}

module.exports = { InMemoryAppointmentRepository };
