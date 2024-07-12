module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(t|j)sx?$': 'babel-jest',
    },
    collectCoverage: true,
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/public/',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  };