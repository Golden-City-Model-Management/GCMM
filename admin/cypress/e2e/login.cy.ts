
const baseUrl = '/admin'

describe('Login user with form', () => {
  it('Login user with email and password', () => {
    cy.visit(baseUrl).location('href').should('contain', '/login')
    cy.intercept(`${Cypress.env('CYPRESS_SERVER_URL')}/users/login`).as('login')
    cy.get('[data-testid="email"]').type(Cypress.env('CYPRESS_TEST_USERNAME'))
    cy.get('[data-testid="password"]').type(Cypress.env('CYPRESS_TEST_PASSWORD'))
    cy.get('[data-testid="login"]').click()
    cy.wait('@login').then(interception => {
      if(interception?.response?.statusCode === 200){
        cy.location('href').should('not.include', '/login')
      }else{
        cy.location('href').should('include', '/login')
      }
    })
  })
})
export {}