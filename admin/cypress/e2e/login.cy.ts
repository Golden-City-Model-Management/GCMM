
const baseUrl = '/admin'

describe('Login user with form', () => {
  it('Login user with email and password', () => {
    cy.log(Cypress.env('NEXT_PUBLIC_SERVER_URL'))
    cy.visit(baseUrl).location('href').should('contain', '/login')

    cy.get('[data-testid="email"]').type(Cypress.env('CYPRESS_TEST_USERNAME'))
    cy.get('[data-testid="password"]').type(Cypress.env('CYPRESS_TEST_PASSWORD'))
    cy.get('[data-testid="login"]').click()
    cy.location('href').should('not.include', '/login')
  })
})
export {}