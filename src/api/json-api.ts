import * as httpError from "http-errors";
import {
  ErrorHandler,
  ResponseHandler,
  ResponseValidator,
  createGateKeeper,
} from "../utils/api.gate-keeper.utils";

export type ApiResponse = {
  success: true;
  message: string;
  data: any;
};

const isSendable: ResponseValidator = (response) => {
  const isValidResponse =
    typeof response === "object" &&
    Reflect.get(response, "success") === true &&
    typeof response.message === "string" &&
    Reflect.has(response, "data");

  return isValidResponse;
};

const onResponse: ResponseHandler = (response, req, res) => {
  return res.json(response);
};

const onError: ErrorHandler = (err: any, req, res) => {
  console.error(err);
  const defaultError = httpError.InternalServerError();

  err.status = err.status || defaultError.status;
  err.message = err.message || defaultError.message;

  return res.status(err.status).json({
    success: false,
    reason: err.message,
  });
};

export const jsonApi = createGateKeeper({
  isSendable,
  onResponse,
  onError,
});
