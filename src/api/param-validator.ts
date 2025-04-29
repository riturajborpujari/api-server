import * as R from "ramda";
import * as httpError from "http-errors";
import { ApiHandler } from "../utils/api.gate-keeper.utils";

export const createParamValidator =
  (params: string[], reqKey: "body" | "query" | "params"): ApiHandler =>
  req => {
    const paramContainer = Reflect.get(req, reqKey);
    const missingParams = params.filter(paramName =>
      R.not(Reflect.has(paramContainer, paramName))
    );

    if (R.not(R.isEmpty(missingParams))) {
      throw httpError.BadRequest(
        `Required fields '${missingParams.join(
          ","
        )}' are missing from ${reqKey}`
      );
    }
  };
