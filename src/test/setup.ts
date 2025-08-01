import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@emotion/styled", () => {
  return {
    default: new Proxy({}, {
      get: (_, tag) => () => tag,
    }),
  };
});