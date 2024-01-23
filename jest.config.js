module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
};
