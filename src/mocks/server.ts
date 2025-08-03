import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';
import { giftRankingHandlers } from '@/mocks/giftRankingHandlers';

export const server = setupServer(...handlers, ...giftRankingHandlers);
