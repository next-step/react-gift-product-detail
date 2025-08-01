
import { fetchAuthhandlers } from '@/apis/AuthApu.mock';
import { fetchRankingHandlers } from '@/apis/RankingApi.mock';
import { Testhandler } from '@/apis/TestApi.mocks';
import { setupServer } from 'msw/node';

const handlers = [...fetchAuthhandlers, ...fetchRankingHandlers, ...Testhandler];
export const server = setupServer(...handlers);

// 모든 테스트 전에 API 모킹 설정
beforeAll(() => server.listen());
// 각 테스트 후에 모든 핸들러 리셋
afterEach(() => server.resetHandlers());
// 테스트 후에 클린업
afterAll(() => server.close());
