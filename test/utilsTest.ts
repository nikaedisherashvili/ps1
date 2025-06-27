import assert from "assert";
import { add } from "../src/utils"; // Import utility functions

describe("Utility Functions Test Suite", () => {
  describe("add()", () => {
    it("correctly adds two positive integers", () => {
      assert.strictEqual(add(2, 3), 5);
    });

    it("correctly adds positive and negative integers", () => {
      assert.strictEqual(add(5, -2), 3);
    });

    it("correctly adds zero to any number", () => {
      assert.strictEqual(add(7, 0), 7);
    });
  });
});
