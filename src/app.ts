import * as express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

export default app;
