
declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(val: string): Chainable<Element>
    }
  }
}

export default {}