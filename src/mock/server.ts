import { setupServer } from "msw/node";
import { getRankingHandler } from "./handlers/rankingHandler";

export const server = setupServer(
  getRankingHandler 
);