import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    watchForFileChanges: true,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    devServerConfig: {
      chrome: {
        args: ["--headless", "--disable-gpu", "--no-sandbox"],
      },
    },
  },
});
