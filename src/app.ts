import * as express from "express";
import { jsonApi } from "./api/json-api";
import { notFoundHandler } from "./api/not-found.handler";
import { createParamValidator } from "./api/param-validator";
import { requestLogger } from "./api/logger";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

const demoApi = jsonApi.guard([
  createParamValidator(["a"], "body"),
  (req, res) => {
    return {
      success: true,
      message: "Demo Success response",
      data: { foo: "bar" },
    };
  },
]);

app.post("/demo", demoApi);

app.use(notFoundHandler);

export default app;
