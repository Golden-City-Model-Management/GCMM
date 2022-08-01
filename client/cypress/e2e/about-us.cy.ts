

const baseUrl = '/about-us'

describe('About us page is rendered with appropriate elements', () => {

  before(() => {
    cy.visit(baseUrl)
  })
  it('renders a main element', () => {
     cy.get('main').should('exist')
  })

  it('renders a heading', () => {
    cy.get('h1').should('exist').should('contain', 'About Us')
  })

  it('renders call to action', () => {
    cy.get('a[href="/careers"]').should('exist').should('contain.text', 'join our team')
  })
})

describe('about call to action leads to careers page', () => {
  it('navigates to careers page on click of call to action', () => {
    cy.get('a[href="/careers"]').click()
    cy.url().should('include', '/careers')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}