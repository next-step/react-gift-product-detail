import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { ComponentType } from "react";

vi.mock("@emotion/styled", () => ({
  default: (component: ComponentType) => component,
}));
