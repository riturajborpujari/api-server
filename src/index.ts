import * as http from "http";
import app from "./app";
import { configure, getConfig } from "./config/config.service";
import { logger, setLogLevel } from "./utils/logger.utils";

async function start() {
  configure();
  const config = getConfig();
  setLogLevel(config.LOG_LEVEL);

  const server = http.createServer(app);
  server.listen(config.APP_PORT, () => {
    logger.info(`${config.APP_NAME} running on ${config.APP_PORT}`);
  });
}

start();
