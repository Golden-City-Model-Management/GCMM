
const baseUrl = '/contact-us'

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
    cy.get('input[name="message"]').should('exist')
    cy.get('input[type="submit"]').should('exist')
  })

})

describe('contact form submits', () => {
  it('submits form', () => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@email.com')
    cy.get('input[name="message"]').type('This is a test message')
    cy.get('input[type="submit"]').click()
    const successAlert = cy.get('[data-testid="contact-form-success"]').should('exist').should('contain.text', 'Your message has been sent!')
    cy.get('[data-testid="contact-form-success"]').children('[data-testid="contact-form-success-close"]').click()
    successAlert.should('not.exist')
  })
})