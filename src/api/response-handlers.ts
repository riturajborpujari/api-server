import * as httpError from "http-errors";
import * as R from "ramda";
import { ErrorRequestHandler, RequestHandler } from "express";
import {
  ErrorHandler,
  ResponseHandler,
  ResponseValidator
} from "../utils/api.gate-keeper.utils";
import { logger } from "../utils/logger.utils";
import createHttpError = require("http-errors");

export type ApiResponse = {
  success: true;
  message: string;
  data: any;
};

export const isSendable: ResponseValidator = response => {
  const isValidResponse =
    typeof response === "object" &&
    Reflect.get(response, "success") === true &&
    typeof response.message === "string" &&
    Reflect.has(response, "data");

  return isValidResponse;
};

export const onResponse: ResponseHandler = (response, req, res) => {
  res.locals.result = response;
  return res
    .status(response.statusCode || 200)
    .json(R.pick(["success", "message", "data"], response));
};

export const onError: ErrorHandler = (actualError: any, req, res) => {
  logger.debug(actualError.stack);

  const defaultErrorByCode = createHttpError(actualError.statusCode || 500);

  // set the error for request logger
  res.locals.result = new Error(
    `${defaultErrorByCode.message}: ${actualError.message}`
  );

  return res.status(defaultErrorByCode.status).json({
    success: false,
    reason:
      defaultErrorByCode.status < 500
        ? actualError.message
        : defaultErrorByCode.message
  });
};

export const notFoundHandler: RequestHandler = (req, res) => {
  res.locals.result = new Error("not found");
  return res.status(404).json({ success: false, reason: "resource not found" });
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  logger.error(err.message);
  logger.info(err.stack);
  return res
    .status(500)
    .json({ success: false, reason: "Internal Server Error" });
};
