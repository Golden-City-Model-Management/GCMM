import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    watchForFileChanges: true,
    specPattern: "**/e2e/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    supportFile: "./cypress/support/component.tsx",
    specPattern: "**/component/*.cy.{js,jsx,ts,tsx}",
  },
  
});
