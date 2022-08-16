

const baseUrl = '/admin'

describe('Login user', () => {

  it('Login user with email and password', () => {
    cy.visit('/admin/login')
  })
})