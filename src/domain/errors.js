"use strict";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class AppointmentNotFoundError extends Error {
  constructor(id) {
    super(`Agendamento ${id} não encontrado.`);
    this.name = "AppointmentNotFoundError";
  }
}

class AppointmentConflictError extends Error {
  constructor() {
    super("Já existe um agendamento nesta data e horário.");
    this.name = "AppointmentConflictError";
  }
}

module.exports = {
  AppointmentConflictError,
  AppointmentNotFoundError,
  ValidationError,
};
