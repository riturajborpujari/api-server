import * as http from "http";
import app from "./app";

async function start() {
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log("Server running on 3000");
  });
}

start();
