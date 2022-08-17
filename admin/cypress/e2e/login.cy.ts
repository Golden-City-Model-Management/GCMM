
const baseUrl = '/admin'

describe('Login user', () => {
  it('Login user with email and password', () => {
    cy.visit(baseUrl).location('href').should('contain', '/login')
    cy.request({
      method: 'POST',
      url: `${Cypress.env('CYPRESS_SERVER_URL')}/users/login`,
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

export {}