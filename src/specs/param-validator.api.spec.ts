import * as httpError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { createParamValidator } from "../api/param-validator";
import { expect } from "chai";

describe("Param Validator", () => {
  it("should throw if required param is missing", () => {
    const fn = () =>
      createParamValidator(["bar"], "body")(
        { body: { foo: "bar" } } as unknown as Request,
        {} as unknown as Response,
        () => {}
      );
    expect(fn).to.throw();
  });

  it("should pass if required param is present", () => {
    const fn = () =>
      createParamValidator(["foo"], "body")(
        { body: { foo: "bar" } } as unknown as Request,
        {} as unknown as Response,
        () => {}
      );
    expect(fn).to.not.throw();
  });
});
