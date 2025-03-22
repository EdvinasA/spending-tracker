module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
      '^shared$': '<rootDir>/lib/shared',
      '^shared/(.*)$': '<rootDir>/lib/shared/$1',
      '^user$': '<rootDir>/lib/user',
      '^user/(.*)$': '<rootDir>/lib/user/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    coverageReporters: ['text', 'lcov'],
    verbose: true
  };