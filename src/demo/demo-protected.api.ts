import { RequestHandler } from "express";
import { createParamValidator } from "../api/param-validator";
import { protectedApi } from "../api/protected-api";

const controller: RequestHandler = (req, res) => {
  return {
    success: true,
    message: "Demo API Protected Success response",
    data: { name: req.body.name }
  };
};

const paramValidator = createParamValidator(["name"], "body");

export const pipeline = protectedApi.guard([paramValidator, controller]);
