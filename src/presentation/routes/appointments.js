"use strict";

const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");

function createAppointmentRouter(controller) {
  const router = express.Router();

  router.get("/", asyncHandler(controller.index));
  router.get("/appointments", asyncHandler(controller.index));
  router.get("/appointments/new", controller.newForm);
  router.post("/appointments", asyncHandler(controller.create));
  router.get("/appointments/:id/edit", asyncHandler(controller.editForm));
  router.post("/appointments/:id/update", asyncHandler(controller.update));
  router.post("/appointments/:id/delete", asyncHandler(controller.delete));
  router.get("/appointments/:id", asyncHandler(controller.show));

  return router;
}

module.exports = { createAppointmentRouter };
