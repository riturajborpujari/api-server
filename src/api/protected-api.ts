import { Request } from "express";
import * as httpError from "http-errors";
import { createGateKeeper } from "../utils/api.gate-keeper.utils";
import { isSendable, onError, onResponse } from "./response-handlers";
import { getConfig } from "../config/config.service";
import { isNotEqual } from "../utils/bool.utils";

const X_API_SECRET_FIELD = "x-api-secret";

export const protectedApi = createGateKeeper(
  {
    isSendable,
    onResponse,
    onError
  },
  [isAuthorized]
);

function isAuthorized(req: Request) {
  const xApiSecret = Reflect.get(req.headers, X_API_SECRET_FIELD);

  if (isNotEqual(getConfig().API_SECRET, xApiSecret)) {
    throw httpError.Forbidden("invalid api key");
  }
}
