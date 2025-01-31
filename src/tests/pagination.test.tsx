import { getPageNumbers } from "@/utils/helper_functions";
import { describe, it, expect } from "vitest";


describe("getPageNumbers", () => {
  it("should return correct page numbers when currentPage is in the middle", () => {
    const result = getPageNumbers(5, 10);
    expect(result).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("should return correct page numbers when currentPage is at the start", () => {
    const result = getPageNumbers(1, 10);
    expect(result).toEqual([1, 2, 3, "...", 10]);
  });

  it("should return correct page numbers when currentPage is at the end", () => {
    const result = getPageNumbers(10, 10);
    expect(result).toEqual([1, "...", 8, 9, 10]);
  });

  it("should return correct page numbers when totalPages is less than or equal to 1", () => {
    const result = getPageNumbers(1, 1);
    expect(result).toEqual([1]);
  });

  it("should return correct page numbers when totalPages is 2", () => {
    const result = getPageNumbers(1, 2);
    expect(result).toEqual([1, 2]);
  });

  it("should return correct page numbers when currentPage is near the start", () => {
    const result = getPageNumbers(2, 10);
    expect(result).toEqual([1, 2, 3, "...", 10]);
  });

  it("should return correct page numbers when currentPage is near the end", () => {
    const result = getPageNumbers(9, 10);
    expect(result).toEqual([1, "...", 8, 9, 10]);
  });
});