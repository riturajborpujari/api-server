import * as express from "express";
import { jsonApi } from "./api/json-api";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

const demoApi = jsonApi.guard([
  (req, res) => {
    if (!req.body.a) {
      throw new Error("body doesn't contain 'a'");
    }
  },
  (req, res) => {
    return {
      success: true,
      message: "Demo Success response",
      data: { foo: "bar" },
    };
  },
]);

app.post("/demo", demoApi);

export default app;
