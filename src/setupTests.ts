import '@testing-library/jest-dom';
import { server } from './mocks/test/server';
import { queryClient } from './__tests__/utils/queryClient';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());
