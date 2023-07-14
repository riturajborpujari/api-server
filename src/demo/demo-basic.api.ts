import { RequestHandler } from "express";
import { createParamValidator } from "../api/param-validator";
import { basicApi } from "../api/basic-api";

const controller: RequestHandler = (req, res) => {
  return {
    success: true,
    message: "Demo API Basic Success response",
    data: { foo: "bar" },
  };
};

const paramValidator = createParamValidator(["a"], "body");

export const pipeline = basicApi.guard([paramValidator, controller]);
