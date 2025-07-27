import { setupServer } from "msw/node";
import { handlers } from "./handler";
export const mockBE = setupServer(...handlers);
