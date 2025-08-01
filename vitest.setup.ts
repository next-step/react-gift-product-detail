import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/node';

console.log('🧪 MSW 서버 시작');
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
