

const baseUrl = '/admin'

describe('Login user', () => {

  it('Login user with email and password', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('[data-testid="login-username"]').type('')
  })
})