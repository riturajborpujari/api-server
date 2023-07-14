import { expect } from "chai";
import { allTrue, isNotEqual } from "../utils/bool.utils";

describe("Boolean utility methods", () => {
  describe("allTrue() method", () => {
    it("should return `true` for all true args", () => {
      const isSuccessful = allTrue(
        1 === 1,
        "hello".length === 5,
        Reflect.has({ foo: "bar" }, "foo")
      );

      expect(isSuccessful).to.be.true;
    });

    it("should return `false` for atleast one false args", () => {
      const isSuccessful = allTrue(
        1 === 1,
        "hello".length === 5,
        Reflect.has({ foo: "bar" }, "bar")
      );

      expect(isSuccessful).to.be.false;
    });
  });

  describe("isNotEqual() method", () => {
    it("should return false for unequal value comparisons", () => {
      const isTrue = isNotEqual(2, "2");
      expect(isTrue).to.be.true;
    });

    it("should return `false` for equal value comparisons", () => {
      const isFalse = isNotEqual(2, 2);
      expect(isFalse).to.be.false;
    });
  });
});
