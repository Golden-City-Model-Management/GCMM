
const baseUrl = '/admin'

describe('Login user with form', () => {
  it('Login user with email and password', () => {
    cy.intercept('POST', `${baseUrl}/api/login`,).as('login')
    cy.visit(baseUrl).location('href').should('contain', '/login')

    cy.get('[data-testid="email"]').type(Cypress.env('CYPRESS_TEST_USERNAME'))
    cy.get('[data-testid="password"]').type(Cypress.env('CYPRESS_TEST_PASSWORD'))
    cy.get('[data-testid="login"]').click()

    cy.wait('@login').then((res) => {
      if(res && res.response && res.response.body && res.response.body.token){
        if(res.response.body.statusCode === 200){
          cy.setCookie('access_token',  res.response.body.token)
          cy.visit(baseUrl) 
          cy.location('href').should('not.include', '/login')
        }else {
          cy.location('href').should('include', '/login')
        }
      }
    })
  })
})
export {}