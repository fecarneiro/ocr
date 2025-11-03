import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: false, // <-- mudou aqui
        tsconfig: {
          esModuleInterop: true,
          moduleResolution: 'Node',
          module: 'commonjs', // <-- adicionou aqui
        },
      },
    ],
  },

  // Removeu estas linhas:
  // extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transformIgnorePatterns: ['node_modules/(?!(pdf-to-img|pdf-parse)/)'],
};

export default config;
