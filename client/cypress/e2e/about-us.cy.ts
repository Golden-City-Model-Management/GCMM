

const baseUrl = '/about-us'

describe('About us page is rendered with appropriate elements', () => {

  it('renders a main element', () => {
     cy.visit(baseUrl)
     cy.get('main').should('exist')
  })

  it('renders a heading', () => {
    cy.visit(baseUrl)
    cy.get('h1').should('exist').should('contain', 'About Us')
  })

  it('renders call to action', () => {
    cy.visit(baseUrl)
    cy.get('a[href="/careers"]').should('exist').should('contain.text', 'join our team')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}