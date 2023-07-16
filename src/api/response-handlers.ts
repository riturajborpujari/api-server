import * as httpError from "http-errors";
import * as R from "ramda";
import { ErrorRequestHandler, RequestHandler } from "express";
import {
  ErrorHandler,
  ResponseHandler,
  ResponseValidator
} from "../utils/api.gate-keeper.utils";
import { logger } from "../utils/logger.utils";

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
  res.locals.response = response;
  return res.json(response);
};

export const onError: ErrorHandler = (err: any, req, res) => {
  res.locals.error = err;
  logger.error(err.stack);

  if (R.not(Reflect.has(err, "status"))) {
    const defaultError = httpError.InternalServerError();

    Reflect.set(err, "status", defaultError.status);
    Reflect.set(err, "message", defaultError.message);
  }

  return res.status(err.status).json({
    success: false,
    reason: err.message
  });
};

export const notFoundHandler: RequestHandler = (req, res) => {
  return res.status(404).json({ success: false, reason: "Resource not found" });
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  logger.error(err);
  return res
    .status(500)
    .json({ success: false, reason: "Internal Server Error" });
};
