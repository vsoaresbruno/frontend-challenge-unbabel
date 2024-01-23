const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@helpers": path.resolve(__dirname, "src/helpers"),
        "@services": path.resolve(__dirname, "src/services"),
      },
    },
  },
});
