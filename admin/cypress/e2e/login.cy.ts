
const baseUrl = '/admin'
const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjMyNGQ1N2U0Yzc1YjAwZTNhMGViOCIsImlhdCI6MTY2MDk5MzA0MywiZXhwIjoxNjY4NzY5MDQzfQ.9mXwBRr4lfIk2cS_oj9RXi0PXl6_7__TBr_NlqYtEGPv5Q'

describe('Login user', () => {
  it('Login user with email and password', () => {
    cy.visit(baseUrl).location('href').should('contain', '/login')
    cy.request({
      method: 'POST',
      url: `${Cypress.env('CYPRESS_SERVER_URL')}users/login`,
      body: {
        userName: Cypress.env('CYPRESS_TEST_USERNAME'),
        password: Cypress.env('CYPRESS_TEST_PASSWORD')
      }
    }).then(res => {
      expect(res.body.user.email).to.eq(Cypress.env('CYPRESS_TEST_USERNAME'))
      cy.setCookie('access_token', res.body.token)
      cy.visit(baseUrl).location('href').should('not.include', '/login')
    })
  })
})

describe('Login user with form', () => {
  it('Login user with email and password', () => {
    cy.intercept('POST', `${Cypress.env('CYPRESS_SERVER_URL')}users/login`, { token }).as('login')
    cy.visit(baseUrl).location('href').should('contain', '/login')

    cy.get('[data-testid="email"]').type(Cypress.env('CYPRESS_TEST_USERNAME'))
    cy.get('[data-testid="password"]').type(Cypress.env('CYPRESS_TEST_PASSWORD'))
    cy.get('[data-testid="login"]').click()

    cy.wait('@login').then((res) => {
      if(res && res.response && res.response.body && res.response.body.token){
        cy.setCookie('access_token',  res.response.body.token)
      }
    })
    cy.visit(baseUrl) 
    cy.location('href').should('not.include', '/login')
  })
})
export {}