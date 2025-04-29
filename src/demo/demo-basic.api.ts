import { ApiHandler } from "../../libs/api-gatekeeper";
import { createParamValidator } from "../api/param-validator";
import { basicApi } from "../api/basic-api";

const controller: ApiHandler = req => {
  return {
    statusCode: 201, //override status code from default 200
    success: true,
    message: "Demo API Basic Success response",
    data: { name: req.body.name }
  };
};

const paramValidator = createParamValidator(["name"], "body");

export const pipeline = basicApi.guard([paramValidator, controller]);
