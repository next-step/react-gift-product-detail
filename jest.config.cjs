module.exports = {
  preset: 'ts-jest',               // ts-jest preset 사용
  testEnvironment: 'jsdom',        // 브라우저 환경
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // ts/tsx 파일을 ts-jest로 처리
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // 자바스크립트 외 파일 매핑
  moduleNameMapper: {
    // 이미지/SVG 모킹
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // CSS 모듈 모킹 (선택)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // src 절대 경로 alias
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // ts/tsx/js/jsx/json/node 모듈 확장자 인식
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // 명시적으로 .tsx 테스트 파일도 매치
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],
}
