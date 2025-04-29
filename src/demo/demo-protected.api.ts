import { ApiHandler } from "../utils/api.gate-keeper.utils";
import { createParamValidator } from "../api/param-validator";
import { protectedApi } from "../api/protected-api";

const controller: ApiHandler = req => {
  return {
    success: true,
    message: "Demo API Protected Success response",
    data: { name: req.body.name }
  };
};

const paramValidator = createParamValidator(["name"], "body");

export const pipeline = protectedApi.guard([paramValidator, controller]);
