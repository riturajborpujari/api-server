import * as express from "express";
import { requestLogger } from "./api/logger";
import { notFoundHandler } from "./api/not-found.handler";

import { router as demoRouter } from "./demo/demo.router";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

app.use("/demo", demoRouter);

app.use(notFoundHandler);

export default app;
