import { setupServer } from 'msw/node';
import { rankingHandlers } from '@/utils/rankingHandlers';

export const server = setupServer(...rankingHandlers);
