import { describe, expect, it } from "vitest";
import { formatDate, toIsoDuration } from "@/lib/date";

describe("formatDate", () => {
  it("formats day month year without shifting across time zones", () => {
    expect(formatDate("2026-03-14")).toBe("14 March 2026");
    expect(formatDate("2025-01-01")).toBe("1 January 2025");
    expect(formatDate("2025-12-31")).toBe("31 December 2025");
  });
});

describe("toIsoDuration", () => {
  it("expresses minutes as an ISO 8601 duration", () => {
    expect(toIsoDuration(9)).toBe("PT9M");
  });
});
