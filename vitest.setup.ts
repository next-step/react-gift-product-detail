import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/node';
console.log('✅ MSW 서버 시작');
beforeAll(() => server.listen({
  onUnhandledRequest(request) {
    console.log('Unhandled %s %s', request.method, request.url)
  },
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
