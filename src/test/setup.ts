import { server } from '@mock/server';
import '@testing-library/jest-dom';

// MSW start
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
