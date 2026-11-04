"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const {
  createDatabase,
} = require("../../src/infrastructure/database/database");
const { createCompositionRoot } = require("../../src/main/compositionRoot");
const { createApp } = require("../../src/main/app");

function testApplication(options = {}) {
  const database = createDatabase({ filename: ":memory:" });
  const application = createCompositionRoot({
    database,
    clock: () => new Date("2026-01-15T16:30:45-03:00"),
    ...options,
  });

  return { ...application, close: () => database.close() };
}

const futureForm = {
  clientName: "Ana Silva",
  service: "Consulta",
  appointmentDate: "2026-01-16",
  appointmentTime: "10:00",
  notes: "Retorno",
};

test("serves forms and completes the appointment CRUD over HTTP", async (t) => {
  const application = testApplication();
  t.after(application.close);

  const home = await request(application.app).get("/");
  assert.equal(home.status, 200);
  assert.match(home.text, /Nenhum agendamento ainda/);
  assert.match(home.headers["content-security-policy"], /default-src/);

  const form = await request(application.app).get("/appointments/new");
  assert.equal(form.status, 200);
  assert.match(form.text, /for="clientName"/);

  const createdResponse = await request(application.app)
    .post("/appointments")
    .type("form")
    .send(futureForm)
    .expect(302);
  const appointmentUrl = createdResponse.headers.location;

  const created = await request(application.app)
    .get(appointmentUrl)
    .expect(200);
  assert.match(created.text, /Ana Silva/);
  assert.match(created.text, /Retorno/);

  const listed = await request(application.app)
    .get("/appointments")
    .expect(200);
  assert.match(listed.text, /Consulta/);
  assert.match(listed.text, /2026-01-16/);

  const id = appointmentUrl.split("/").pop();
  const editForm = await request(application.app)
    .get(`/appointments/${id}/edit`)
    .expect(200);
  assert.match(editForm.text, /value="Ana Silva"/);

  const update = await request(application.app)
    .post(`/appointments/${id}/update`)
    .type("form")
    .send({ ...futureForm, clientName: "Ana atualizada" })
    .expect(302);
  const updated = await request(application.app)
    .get(update.headers.location)
    .expect(200);
  assert.match(updated.text, /Ana atualizada/);

  await request(application.app)
    .post("/appointments")
    .type("form")
    .send({ ...futureForm, clientName: "Outra pessoa" })
    .expect(409);

  const invalidDate = await request(application.app)
    .post("/appointments")
    .type("form")
    .send({ ...futureForm, appointmentDate: "2026-02-30" })
    .expect(400);
  assert.match(invalidDate.text, /Data inválida/);

  await request(application.app).post(`/appointments/${id}/delete`).expect(302);
  await request(application.app).get(appointmentUrl).expect(404);
  const emptyList = await request(application.app)
    .get("/appointments")
    .expect(200);
  assert.match(emptyList.text, /Nenhum agendamento ainda/);
});

test("rejects past HTTP appointments using the controlled Sao Paulo clock", async (t) => {
  const application = testApplication();
  t.after(application.close);

  const response = await request(application.app)
    .post("/appointments")
    .type("form")
    .send({
      ...futureForm,
      appointmentDate: "2026-01-15",
      appointmentTime: "16:29",
    })
    .expect(400);

  assert.match(response.text, /Não é possível agendar no passado/);
});

test("returns a sanitized 500 page and logs unexpected failures", async () => {
  const loggedErrors = [];
  const app = createApp({
    controller: {
      index: async () => {
        throw new Error("SQL_SECRET_INTERNAL");
      },
      newForm: () => {},
      create: async () => {},
      show: async () => {},
      editForm: async () => {},
      update: async () => {},
      delete: async () => {},
    },
    logger: { error: (error) => loggedErrors.push(error) },
  });

  const response = await request(app).get("/").expect(500);
  assert.match(response.text, /erro inesperado/i);
  assert.doesNotMatch(response.text, /SQL_SECRET_INTERNAL/);
  assert.equal(loggedErrors.length, 1);
  assert.match(response.headers["content-security-policy"], /default-src/);
});

test("returns a generic 404 for unknown routes", async (t) => {
  const application = testApplication();
  t.after(application.close);

  const response = await request(application.app)
    .get("/missing-route")
    .expect(404);
  assert.match(response.text, /Agendamento não encontrado/);
  assert.doesNotMatch(response.text, /stack|Error:/i);
});

test("requires a controller when constructing the Express application", () => {
  assert.throws(() => createApp({}), TypeError);
});
