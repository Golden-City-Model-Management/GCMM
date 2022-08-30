/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(val: string): Chainable<Element>,
      login(arg1:{email: string, password: string}): Chainable<Element>
    }
  }
}
export {}