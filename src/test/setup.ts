import "whatwg-fetch";
import "@testing-library/jest-dom";

import { server } from "@/mock/server";
import { beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "error" })); // 오류 잡기 편하게
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
