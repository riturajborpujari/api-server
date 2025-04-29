import * as httpError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { createParamValidator } from "../api/param-validator";
import { expect } from "chai";

describe("Param Validator", () => {
  it("should throw if required param is missing", () => {
    const validator = createParamValidator(["foo"], "body");
    const fn = (): void =>
      validator({ body: { bar: "baz" } } as unknown as Request) as void;
    expect(fn).to.throw();
  });

  it("should pass if required param is present", () => {
    const validator = createParamValidator(["foo"], "body");
    const fn = (): void =>
      validator({ body: { foo: "bar" } } as unknown as Request) as void;
    expect(fn).to.not.throw();
  });
});
