import * as http from "http";
import app from "./app";
import { configure, getConfig } from "./config/config.service";

async function start() {
  configure();
  const config = getConfig();

  const server = http.createServer(app);
  server.listen(config.APP_PORT, () => {
    console.log(`${config.APP_NAME} running on ${config.APP_PORT}`);
  });
}

start();
