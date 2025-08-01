import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/vitest'

export const server = setupServer()

expect.extend(matchers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())