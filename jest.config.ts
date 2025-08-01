import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom', 
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], 
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'], 
};

export default config;
