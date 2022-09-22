
const baseUrl = '/admin/models'

describe('Models', () => {
  it('allows access only after login', () => {
    cy.visit(baseUrl)
    cy.location('href').should('not.include', 'models')
    cy.login({ email: Cypress.env('CYPRESS_TEST_USERNAME'), password: Cypress.env('CYPRESS_TEST_PASSWORD') }).then(res => {
        cy.visit(baseUrl)
        cy.location('href').should('include', 'models')
        cy.location('href').should('not.include', 'login')
        cy.dataCy('models-list').should('exist')
    })
  })
})

export { }