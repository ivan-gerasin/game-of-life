module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.tsx?$": "ts-jest",
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
};