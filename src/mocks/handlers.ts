import { loginHandlers } from './loginApi.mock';
import { rankingHandlers } from './rankingApi.mock';

export const handlers = [...loginHandlers, ...rankingHandlers];
