import { setupServer } from "msw/node";
import { handlers } from "@/test/RankingSectionTest/handlers";

export const server = setupServer(...handlers);
