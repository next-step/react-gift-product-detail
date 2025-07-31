import "@testing-library/jest-dom";
import { server } from "@/mocks/server";
import { beforeAll, afterEach, afterAll } from "vitest"; // vitest에서 직접 import 합니다.

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
