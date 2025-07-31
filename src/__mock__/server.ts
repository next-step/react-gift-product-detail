import { handlers } from "@/__mock__/handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);
