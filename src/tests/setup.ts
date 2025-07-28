import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { mockBE } from "@src/mock/msw/server";

beforeAll(() => mockBE.listen());
afterEach(() => mockBE.resetHandlers());
afterAll(() => mockBE.close());
