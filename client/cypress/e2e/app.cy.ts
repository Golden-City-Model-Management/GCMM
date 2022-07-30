

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
  it('renders call to actions', () => {
    cy.visit(baseUrl)
    cy.get('a').should('exist').should('contain', /Main Board/i)
    cy.get('a').should('exist').should('contain', /New Faces/i)
  })
})

// Prevent TypeScript from reading file as legacy script
export {}