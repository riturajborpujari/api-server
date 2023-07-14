import { expect } from "chai";

describe("Alwasy passing tests", () => {
  it("1 is equal to 1", () => {
    expect(1).to.be.equal(1);
  });

  it("Array.indexOf returns -1 if not found", () => {
    const index = [1, 2, 4].indexOf(3);
    expect(index).to.be.equal(-1);
  });
});
