import * as R from "ramda";
import { RequestHandler } from "express";
import { logger } from "../utils/logger.utils";

export const requestLogger: RequestHandler = (req, res, next) => {
  const reqTimestamp = Date.now();

  res.on("close", () => {
    const resTimestamp = Date.now();
    const delay = resTimestamp - reqTimestamp;

    logger.info(
      [
        "api",
        req.method,
        req.path,
        res.statusCode,
        `${delay}ms`,
        JSON.stringify(R.pick(["query", "params", "body"], req))
      ].join(" - ")
    );
  });

  next();
};
