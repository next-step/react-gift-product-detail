import '@testing-library/jest-dom';
import { server } from './mock/server'
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
