import * as R from "ramda";
import { RequestHandler, Request, Response } from "express";
import { logger } from "../utils/logger.utils";

export const requestLogger: RequestHandler = (req, res, next) => {
  const reqTimestamp = Date.now();

  res.on("close", () => {
    const resTimestamp = Date.now();
    const delay = resTimestamp - reqTimestamp;

    logger.info(buildLogMessage(req, res, delay));
  });

  next();
};

function buildLogMessage(req: Request, res: Response, delayInMs) {
  const reqDataFormattedList = ["query", "body"]
    .filter(field => R.not(R.isEmpty(Object.keys(Reflect.get(req, field)))))
    .reduce(
      (acc, field) => {
        const fieldValue = Reflect.get(req, field);
        acc.push(`${field}:${JSON.stringify(fieldValue)}`);
        return acc;
      },
      ["REQUEST_DETAILS"] as string[]
    );

  const resLocalsFormattedList = Object.keys(res.locals).reduce(
    (acc, field) => {
      const fieldValue = Reflect.get(res.locals, field);
      acc.push(`${field}:${JSON.stringify(fieldValue)}`);
      return acc;
    },
    ["RESPONSE_LOCALS"] as string[]
  );

  const logMessage = [
    req.method,
    req.path,
    res.statusCode,
    `${delayInMs}ms`,
    ...reqDataFormattedList,
    ...resLocalsFormattedList
  ].join(" - ");

  return logMessage;
}
