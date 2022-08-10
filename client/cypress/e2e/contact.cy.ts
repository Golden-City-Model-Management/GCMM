
const baseUrl = '/contact'

describe('Contact page is rendered with appropriate elements', () => {

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('renders a main element', () => {
    cy.get('main').should('exist')
  })

  it('renders a heading', () => {
    cy.get('h1').should('exist').should('contain', 'Contact Us')
  })
  
  it('renders contact form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('textarea[name="message"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

})

describe('contact form submits', () => {
  it('submits form', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@email.com')
    cy.get('textarea[name="message"]').type('This is a test message')
    cy.get('form').submit()
    const successAlert = cy.get('[data-testid="contact-form-success"]')
    successAlert.should('exist')
    successAlert.get('button[data-testid="close-contact-form-success"]').click()
  })
})

export {}