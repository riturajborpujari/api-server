import { RequestHandler } from "express";
import { createParamValidator } from "../api/param-validator";
import { protectedApi } from "../api/protected-api";

const controller: RequestHandler = (req, res) => {
  return {
    success: true,
    message: "Demo API Basic Success response",
    data: { foo: "bar" },
  };
};

const paramValidator = createParamValidator(["a"], "body");

export const pipeline = protectedApi.guard([paramValidator, controller]);
