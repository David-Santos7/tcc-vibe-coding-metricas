"use strict";

const {
  AppointmentConflictError,
  AppointmentNotFoundError,
  ValidationError,
} = require("../../domain/errors");

function errorHandler({ logger = console } = {}) {
  return function handleError(error, request, response, next) {
    if (response.headersSent) {
      next(error);
      return;
    }

    let status = 500;
    let message = "Ocorreu um erro inesperado. Tente novamente.";

    if (error instanceof ValidationError) {
      status = 400;
      message = error.message;
    } else if (error instanceof AppointmentNotFoundError) {
      status = 404;
      message = "Agendamento não encontrado.";
    } else if (error instanceof AppointmentConflictError) {
      status = 409;
      message = error.message;
    } else {
      logger.error(error);
    }

    response.status(status).render("error", { status, message });
  };
}

module.exports = { errorHandler };
