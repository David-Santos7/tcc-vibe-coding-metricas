"use strict";

const { randomUUID } = require("node:crypto");
const { ValidationError } = require("./errors");

function requiredText(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ValidationError(`${field} é obrigatório.`);
  }

  return value.trim();
}

function isRealDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12) {
    return false;
  }

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day >= 1 && day <= daysInMonth[month - 1];
}

function normalizeAppointmentData(data) {
  const clientName = requiredText(data.clientName, "Nome do cliente");
  const service = requiredText(data.service, "Serviço");

  if (!isRealDate(data.appointmentDate)) {
    throw new ValidationError("Data inválida. Use o formato AAAA-MM-DD.");
  }

  if (
    typeof data.appointmentTime !== "string" ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(data.appointmentTime)
  ) {
    throw new ValidationError("Horário inválido. Use o formato HH:mm.");
  }

  const notes = data.notes ?? "";
  if (typeof notes !== "string") {
    throw new ValidationError("Observações inválidas.");
  }

  if (notes.length > 500) {
    throw new ValidationError(
      "Observações devem ter no máximo 500 caracteres.",
    );
  }

  return {
    clientName,
    service,
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    notes: notes.trim(),
  };
}

class Appointment {
  constructor({
    id,
    clientName,
    service,
    appointmentDate,
    appointmentTime,
    notes,
    createdAt,
    updatedAt,
  }) {
    Object.assign(this, {
      id,
      clientName,
      service,
      appointmentDate,
      appointmentTime,
      notes,
      createdAt,
      updatedAt,
    });
  }

  static create(data, { id = randomUUID(), now = new Date() } = {}) {
    const appointmentData = normalizeAppointmentData(data);
    const timestamp = now.toISOString();

    return new Appointment({
      id,
      ...appointmentData,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  static update(existing, data, now = new Date()) {
    return new Appointment({
      id: existing.id,
      ...normalizeAppointmentData(data),
      createdAt: existing.createdAt,
      updatedAt: now.toISOString(),
    });
  }
}

module.exports = { Appointment, isRealDate, normalizeAppointmentData };
