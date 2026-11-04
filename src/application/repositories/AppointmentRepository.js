"use strict";

const APPOINTMENT_REPOSITORY_METHODS = Object.freeze([
  "create",
  "findById",
  "findByDateTime",
  "list",
  "update",
  "delete",
]);

function assertAppointmentRepository(repository) {
  const missingMethods = APPOINTMENT_REPOSITORY_METHODS.filter(
    (method) => typeof repository?.[method] !== "function",
  );

  if (missingMethods.length > 0) {
    throw new TypeError(
      `Repositório de agendamentos inválido. Métodos ausentes: ${missingMethods.join(", ")}.`,
    );
  }

  return repository;
}

module.exports = {
  APPOINTMENT_REPOSITORY_METHODS,
  assertAppointmentRepository,
};
