module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/index.ts"
  ],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
};