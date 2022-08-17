

const baseUrl = '/';

describe('Home page is rendered with appropriate elements', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('renders a main element', () => {
    cy.get('main').should('exist')
  })

  it('renders a heading', () => {
    cy.get('h1').should('exist').should('contain', 'GoldenCity Model Management')
  })

  it('renders call to action', () => {
    const callToAction = cy.dataCy('hero-cta')
    callToAction.children('a').should('have.length', 2)
    callToAction.get('a[href="/mainboard"]').should('exist')
    callToAction.get('a[href="/newfaces"]').should('exist')
  })  
  
  it('renders gallery section with heading and link', () => {
    const gallery = cy.dataCy('gallery-preview')
    gallery.should('exist')
    gallery.children('h2').should('exist').should('contain.text', 'Talent at its finest')
    cy.get('a[href="/gallery"]').should('exist').should('contain.text', 'explore gallery')
  })
})

describe('call to action leads to appropriate page', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  })
  it('navigates to main board page on click of call to action', () => {
    const hero = cy.dataCy('hero-cta')
    hero.children('a[href="/mainboard"]').click()
    cy.url().should('include', '/mainboard')
  })

  it('navigates to new faces page on click of call to action', () => {
    const hero = cy.dataCy('hero-cta')
    hero.children('a[href="/newfaces"]').click()
    cy.url().should('include', '/newfaces')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}