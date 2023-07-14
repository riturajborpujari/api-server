import * as express from "express";
import { basicApi } from "./api/basic-api";
import { notFoundHandler } from "./api/not-found.handler";
import { createParamValidator } from "./api/param-validator";
import { requestLogger } from "./api/logger";
import { protectedApi } from "./api/protected-api";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

const demoApiBasic = basicApi.guard([
  createParamValidator(["a"], "body"),
  (req, res) => {
    return {
      success: true,
      message: "Demo API Basic Success response",
      data: { foo: "bar" },
    };
  },
]);

const demoApiProtected = protectedApi.guard([
  createParamValidator(["a"], "body"),
  (req, res) => {
    return {
      success: true,
      message: "Demo API Protected Success response",
      data: { foo: "bar" },
    };
  },
]);

app.post("/demo/basic", demoApiBasic);
app.post("/demo/protected", demoApiProtected);

app.use(notFoundHandler);

export default app;
