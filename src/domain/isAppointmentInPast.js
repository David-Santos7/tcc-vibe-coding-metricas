"use strict";

const { ValidationError } = require("./errors");

const SAO_PAULO_TIME_ZONE = "America/Sao_Paulo";

function localDateTime(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("O relógio deve retornar uma data válida.");
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SAO_PAULO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${values.year.padStart(4, "0")}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

function isAppointmentInPast(appointment, now) {
  const appointmentDateTime = `${appointment.appointmentDate}T${appointment.appointmentTime}`;
  return appointmentDateTime < localDateTime(now);
}

function assertAppointmentIsNotInPast(appointment, now) {
  if (isAppointmentInPast(appointment, now)) {
    throw new ValidationError("Não é possível agendar no passado.");
  }
}

module.exports = {
  assertAppointmentIsNotInPast,
  isAppointmentInPast,
  localDateTime,
};
