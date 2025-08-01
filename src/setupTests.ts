import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll } from "vitest";
import "whatwg-fetch";
import { server } from "@/test/RankingSectionTest/mockServer";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
