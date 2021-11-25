import { partition, sum } from "../index";

describe("Utils", () => {
  describe("#partial", () => {
    it("should splid array by condition", () => {
      expect(partition([1, 2, 3, 4, 5, 6], (i) => i > 2)).toEqual([
        [3, 4, 5, 6],
        [1, 2],
      ]);
    });
  });

  describe("#sum", () => {
    it("should sum two numbers", () => {
      expect(sum(1, 2)).toEqual(2);
    });
  });
});
