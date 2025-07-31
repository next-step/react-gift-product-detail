import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// 모든 테스트 시작 전 MSW 서버 실행
beforeAll(() => server.listen());
// 각 테스트 후 핸들러 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트 종료 후 MSW 서버 종료
afterAll(() => server.close());
