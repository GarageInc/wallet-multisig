module.exports = {
  'testTimeout': 20000,
  'testEnvironment': 'jsdom',
  'setupFilesAfterEnv': ['./jest.setup.js'],
  'testRegex': ".*.(test).(j)s?$",
  'transform': {
    "^.+\\.js$": "babel-jest",
  },
  'transformIgnorePatterns': [
    'node_modules/(?!uuid|bigint-crypto-utils|paillier-bigint|crypto-random-string)'
  ],
  'moduleNameMapper': {
    "\\.(css|less|scss)$": 'identity-obj-proxy',
    '^.+.(svg)$': 'jest-transform-stub',
  }
}
