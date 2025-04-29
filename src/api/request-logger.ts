import * as R from "ramda";
import { RequestHandler, Request, Response } from "express";
import { logger } from "../utils/logger.utils";

export const requestLogger: RequestHandler = (req, res, next) => {
  const reqTimestamp = Date.now();

  res.on("close", () => {
    const resTimestamp = Date.now();
    const delay = resTimestamp - reqTimestamp;

    logger.info(buildRequestLog(req, res, delay));
  });

  next();
};

function buildRequestLog(req: Request, res: Response, delayInMs: number) {
  const components = [
    req.method,
    req.baseUrl + req.path,
    `${delayInMs}ms`,
    res.statusCode
  ];

  if (res.locals.result) {
    components.push(res.locals.result.message);
  }

  return components.join(" ");
}
