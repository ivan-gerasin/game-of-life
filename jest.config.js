module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
    "^.+\\.tsx?$": "ts-jest",
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
};