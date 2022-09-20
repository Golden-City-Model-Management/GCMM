import { defineConfig } from "cypress";
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    watchForFileChanges: true,
    specPattern: "./cypress/e2e/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      config.env.CYPRESS_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
      config.env.CYPRESS_TEST_USERNAME = process.env.CYPRESS_TEST_USERNAME
      config.env.CYPRESS_TEST_PASSWORD = process.env.CYPRESS_TEST_PASSWORD
      return config
    }
  },
  component: {
    devServer: { 
      framework: "next",
      bundler: "webpack",
    },
    supportFile: "./cypress/support/component.tsx",
    watchForFileChanges: true,
    specPattern:[ "./cypress/component/*.cy.{js,jsx,ts,tsx}",  "**/cypress/component/*.cy.{js,jsx,ts,tsx}", "./cypress/component/*.cy.{js,jsx,ts,tsx}"],
  },
  
});
