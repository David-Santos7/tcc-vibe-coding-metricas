"use strict";

const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { createDatabase } = require("../infrastructure/database/database");
const { createCompositionRoot } = require("./compositionRoot");

function startServer(options = {}) {
  const port = options.port ?? Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new RangeError("PORT deve ser um inteiro entre 0 e 65535.");
  }

  const filename =
    options.filename ??
    process.env.DATABASE_PATH ??
    path.resolve(__dirname, "../../data/appointments.db");
  const database = createDatabase({ filename });
  const logger = options.logger ?? console;
  const { app } = createCompositionRoot({ database, logger });
  const server = app.listen(port, () => {
    logger.log(`Servidor disponível em http://localhost:${port}`);
  });

  function shutdown() {
    server.close((error) => {
      database.close();
      if (error) {
        logger.error(error);
        process.exitCode = 1;
      }
    });
  }

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);

  return { server, database };
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
