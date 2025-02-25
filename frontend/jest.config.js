module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.js?(x)'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
    coverageReporters: ['json', 'lcov', 'text'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-leaflet|leaflet|@react-leaflet|leaflet-routing-machine)/)',
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js', 
    },
  };
  