"use strict";

const { AppointmentConflictError } = require("../../domain/errors");

function mapAppointment(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    clientName: row.client_name,
    service: row.service,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class SQLiteAppointmentRepository {
  constructor(database) {
    this.database = database;
    this.insertStatement = database.prepare(`
      INSERT INTO appointments (
        id, client_name, service, appointment_date, appointment_time,
        notes, created_at, updated_at
      ) VALUES (
        @id, @clientName, @service, @appointmentDate, @appointmentTime,
        @notes, @createdAt, @updatedAt
      )
    `);
    this.findByIdStatement = database.prepare(
      "SELECT * FROM appointments WHERE id = ?",
    );
    this.findByDateTimeStatement = database.prepare(`
      SELECT * FROM appointments
      WHERE appointment_date = ?
        AND appointment_time = ?
        AND (? IS NULL OR id <> ?)
      LIMIT 1
    `);
    this.listStatement = database.prepare(`
      SELECT * FROM appointments
      ORDER BY appointment_date ASC, appointment_time ASC, id ASC
    `);
    this.updateStatement = database.prepare(`
      UPDATE appointments
      SET client_name = @clientName,
          service = @service,
          appointment_date = @appointmentDate,
          appointment_time = @appointmentTime,
          notes = @notes,
          updated_at = @updatedAt
      WHERE id = @id
    `);
    this.deleteStatement = database.prepare(
      "DELETE FROM appointments WHERE id = ?",
    );
  }

  create(appointment) {
    try {
      this.insertStatement.run({ ...appointment });
    } catch (error) {
      if (this.isDateTimeConflict(error)) {
        throw new AppointmentConflictError();
      }

      throw error;
    }

    return this.findById(appointment.id);
  }

  findById(id) {
    return mapAppointment(this.findByIdStatement.get(id));
  }

  findByDateTime(date, time, excludingId) {
    const row = this.findByDateTimeStatement.get(
      date,
      time,
      excludingId ?? null,
      excludingId ?? null,
    );
    return mapAppointment(row);
  }

  list() {
    return this.listStatement.all().map(mapAppointment);
  }

  update(appointment) {
    try {
      this.updateStatement.run({ ...appointment });
    } catch (error) {
      if (this.isDateTimeConflict(error)) {
        throw new AppointmentConflictError();
      }

      throw error;
    }

    return this.findById(appointment.id);
  }

  delete(id) {
    return this.deleteStatement.run(id).changes > 0;
  }

  isDateTimeConflict(error) {
    return (
      error.code === "SQLITE_CONSTRAINT_UNIQUE" &&
      error.message.includes(
        "appointments.appointment_date, appointments.appointment_time",
      )
    );
  }
}

module.exports = { SQLiteAppointmentRepository, mapAppointment };
