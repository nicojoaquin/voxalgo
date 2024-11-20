import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/prisma$': '<rootDir>/libs/prisma/src',
    '^@app/prisma/(.*)$': '<rootDir>/libs/prisma/src/$1',
    '^libs/(.*)$': '<rootDir>/libs/$1'
  },
};

export default config;
