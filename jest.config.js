module.exports = {
  "verbose": true,
  "testEnvironmentOptions": {
    "url": "http://localhost/",
  },
  "moduleFileExtensions": [
    "js",
    "vue",
  ],
  "moduleNameMapper": {
    "^vue$": "<rootDir>/node_modules/vue/dist/vue.runtime.common.prod.js",
    "^@/(.*)$": "<rootDir>/client/$1",
  },
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
  },
  "snapshotSerializers": [
    "<rootDir>/node_modules/jest-serializer-vue",
  ],
  "roots": [
    "client",
    "server",
    "test-suite",
  ],
  "globals" :{
    "window": {},
  },
  "setupFiles": [
    "<rootDir>/client/jest-setup.js",
  ],
};
