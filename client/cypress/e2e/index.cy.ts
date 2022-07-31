

const baseUrl = '/';

describe('Home page is rendered with appropriate elements', () => {
  it('renders a main element', () => {
    cy.visit(baseUrl)
    cy.get('main').should('exist')
  })
  it('renders a heading', () => {
    cy.visit(baseUrl)
    cy.get('h1').should('exist').should('contain', 'GoldenCity Model Management')
  })
  it('renders call to action', () => {
    cy.visit(baseUrl)
    const callToAction = cy.get('[data-testid="hero-cta"]')
    callToAction.children('a').its('length').should('eq', 2)
    callToAction.get('a[href="/main-board"]').should('exist').should('contain.text', 'main board')
    callToAction.get('a[href="/new-faces"]').should('exist').should('contain.text', 'new faces')
  }) 
  
  it('renders gallery section with heading and link', () => {
    const gallery = cy.get('[data-testid="gallery-preview"]')
    gallery.should('exist')
    gallery.get('h2').should('exist').should('contain.text', 'Talent at its finest')
    gallery.get('a[href="/gallery"]').should('exist').should('contain.text', 'explore gallery')
  })

})

// Prevent TypeScript from reading file as legacy script
export {}