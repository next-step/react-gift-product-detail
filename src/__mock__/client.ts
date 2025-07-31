import { setupWorker } from "msw/browser";
import { handlers } from "@/__mock__/handlers";

export const client = setupWorker(...handlers);
