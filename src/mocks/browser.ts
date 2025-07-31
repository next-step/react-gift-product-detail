import { setupWorker } from 'msw/browser';
import { rankingHandlers } from '@/apis/rankingApi.mock';

export const worker = setupWorker(...rankingHandlers);
