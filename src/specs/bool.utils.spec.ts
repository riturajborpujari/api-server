import { expect } from "chai";
import { allTrue } from "../utils/bool.utils";

describe("Utility method allTrue()", () => {
  it("should return `true` for all true args", () => {
    const isSuccessful = allTrue(
      1 === 1,
      "hello".length === 5,
      Reflect.has({ foo: "bar" }, "foo")
    );

    expect(isSuccessful).to.be.true;
  });
});
