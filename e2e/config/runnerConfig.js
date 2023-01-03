module.exports = {
  globalSetup: '<rootDir>/e2e/config/runnerSetup.ts',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  maxWorkers: 1,
  preset: 'ts-jest',
  reporters: ['detox/runners/jest/reporter', 'jest-image-snapshot/src/outdated-snapshot-reporter.js'],
  rootDir: '../..',
  roots: ['../'],
  setupFilesAfterEnv: ['<rootDir>/e2e/config/setUpTests.ts'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  testMatch: ['<rootDir>/e2e/**/*.e2e.ts'],
  testTimeout: 120000,
  verbose: true,
}
