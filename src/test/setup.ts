import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './server'

// * MSW 서버 설정
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
