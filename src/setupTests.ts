import { server } from "@/mock/server";
import "@testing-library/jest-dom/vitest";
import { afterEach } from "node:test";
import { afterAll, beforeAll } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
