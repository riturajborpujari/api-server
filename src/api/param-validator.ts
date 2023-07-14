import * as R from "ramda";
import * as httpError from "http-errors";
import { RequestHandler } from "express";

export const createParamValidator =
  (params: string[], reqKey: "body" | "query" | "params"): RequestHandler =>
  (req, res) => {
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
