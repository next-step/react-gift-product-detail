/** @type {import('jest').Config} */
module.exports = {
  // TypeScript를 쓰고 있다면 preset 추가 (ts-jest 설치 필요)
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // 테스트 시작 전에 실행할 파일 경로
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // 경로 별칭(@/styles 등)이 있다면 매핑
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // .tsx, .ts 파일도 테스트 대상으로
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
