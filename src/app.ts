import * as express from "express";
import { requestLogger } from "./api/request-logger";

import { router as demoRouter } from "./demo/demo.router";
import { notFoundHandler } from "./api/response-handlers";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

app.use("/demo", demoRouter);

app.use(notFoundHandler);

export default app;
