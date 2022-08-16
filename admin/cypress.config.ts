import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    watchForFileChanges: true,
    specPattern: "./cypress/e2e/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      config.env.server =
        process.env.NODE_ENV === 'development' ? 
        'https://golden-city-model-management.herokuapp.com/' : 
        'https://golden-city-model-management.herokuapp.com/'
      config.env.CYPRESS_TEST_USERNAME = 'iksploiting@gmail.com'
      config.env.CYPRESS_TEST_PASSWORD = 'dev1234'
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
