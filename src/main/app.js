"use strict";

const path = require("node:path");
const express = require("express");
const helmet = require("helmet");
const { AppointmentNotFoundError } = require("../domain/errors");
const { errorHandler } = require("../presentation/middlewares/errorHandler");
const {
  createAppointmentRouter,
} = require("../presentation/routes/appointments");

function createApp({ controller, logger = console }) {
  if (!controller) {
    throw new TypeError("O controller de agendamentos é obrigatório.");
  }

  const app = express();
  app.set("views", path.join(__dirname, "../presentation/views"));
  app.set("view engine", "ejs");
  app.use(helmet());
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));
  app.use(
    express.static(path.join(__dirname, "../presentation/public"), {
      fallthrough: true,
    }),
  );
  app.use(createAppointmentRouter(controller));
  app.use((_request, _response, next) => {
    next(new AppointmentNotFoundError("rota"));
  });
  app.use(errorHandler({ logger }));

  return app;
}

module.exports = { createApp };
