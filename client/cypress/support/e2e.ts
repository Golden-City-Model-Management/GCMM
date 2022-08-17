
import './commands'
Cypress.on('uncaught:exception', () => {
  return false
})

Cypress.Commands.add('dataCy', (dataTestId) => {
  cy.get(`[data-testid="${dataTestId}"]`)
})