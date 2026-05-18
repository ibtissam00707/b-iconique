export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEachFramework: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(png|jpg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};