import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/node';
console.log('✅ MSW 서버 시작');
beforeAll(() => server.listen({
  onUnhandledRequest: 'error', // 💥 핸들러 없는 요청은 에러로 터뜨림
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
