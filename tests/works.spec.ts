import { describe, it, expect } from "bun:test";
import { getDatabase } from "..";

describe("sqlite-vec", () => {
  it("should work", () => {
    const db = getDatabase(":memory:");
    expect(db).toBeDefined();
  });
});