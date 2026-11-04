"use strict";

const {
  AppointmentConflictError,
  ValidationError,
} = require("../../domain/errors");

const EMPTY_APPOINTMENT = {
  clientName: "",
  service: "",
  appointmentDate: "",
  appointmentTime: "",
  notes: "",
};

function appointmentController({
  createAppointment,
  deleteAppointment,
  getAppointment,
  listAppointments,
  updateAppointment,
}) {
  function renderForm(response, { appointment, action, error, status = 200 }) {
    response.status(status).render("appointments/form", {
      appointment: { ...EMPTY_APPOINTMENT, ...appointment },
      action,
      errors: error ? [error.message] : [],
      pageTitle: appointment.id ? "Editar agendamento" : "Novo agendamento",
    });
  }

  return {
    index: async (_request, response) => {
      const appointments = await listAppointments.execute();
      response.render("appointments/index", { appointments });
    },

    newForm: (_request, response) => {
      renderForm(response, {
        appointment: EMPTY_APPOINTMENT,
        action: "/appointments",
      });
    },

    create: async (request, response) => {
      try {
        const appointment = await createAppointment.execute(request.body);
        response.redirect(`/appointments/${appointment.id}`);
      } catch (error) {
        if (
          error instanceof ValidationError ||
          error instanceof AppointmentConflictError
        ) {
          renderForm(response, {
            appointment: request.body,
            action: "/appointments",
            error,
            status: error instanceof AppointmentConflictError ? 409 : 400,
          });
          return;
        }

        throw error;
      }
    },

    show: async (request, response) => {
      const appointment = await getAppointment.execute(request.params.id);
      response.render("appointments/show", { appointment });
    },

    editForm: async (request, response) => {
      const appointment = await getAppointment.execute(request.params.id);
      renderForm(response, {
        appointment,
        action: `/appointments/${appointment.id}/update`,
      });
    },

    update: async (request, response) => {
      try {
        const appointment = await updateAppointment.execute(
          request.params.id,
          request.body,
        );
        response.redirect(`/appointments/${appointment.id}`);
      } catch (error) {
        if (
          error instanceof ValidationError ||
          error instanceof AppointmentConflictError
        ) {
          renderForm(response, {
            appointment: { ...request.body, id: request.params.id },
            action: `/appointments/${request.params.id}/update`,
            error,
            status: error instanceof AppointmentConflictError ? 409 : 400,
          });
          return;
        }

        throw error;
      }
    },

    delete: async (request, response) => {
      await deleteAppointment.execute(request.params.id);
      response.redirect("/appointments");
    },
  };
}

module.exports = { appointmentController };
