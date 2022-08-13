

import LayoutOne from '@/components/layout/LayoutOne';
import LayoutTwo from '@/components/layout/LayoutTwo';
import AdminLayout from '@/components/layout/AdminLayout'

const LayoutChild = () => <div>Hello world</div>

describe('renders layout one with header, navigation, logo and children', () => {
  it('renders layout one', () => {
    cy.mount(<LayoutOne title={'Hello world'} description={'page description'} ><LayoutChild /></LayoutOne>)
    cy.get('header').should('be.visible')
    cy.get('nav').should('exist')
    cy.get('main').should('contain', 'Hello world')
    cy.get('footer').should('exist')
  })
})
describe('renders layout two with header, navigation, logo and children', () => {
  it('renders layout two', () => {
    cy.mount(<LayoutTwo title={'Hello world'} description={'page description'} ><LayoutChild /></LayoutTwo>)
    cy.get('header').should('be.visible')
    cy.get('nav').should('exist')
    cy.get('main').should('contain', 'Hello world')
    cy.get('footer').should('exist')
  })
})

describe('layout display on medium and small screens',   {
  viewportHeight: 600,
  viewportWidth: 600,
}, () => {
  it('toggles navigation for layout one on click of menu button', () => {
    cy.mount(<LayoutOne title={'Hello world'} description={'page description'} ><LayoutChild /></LayoutOne>)
    cy.get('button[data-testid="menu-button"]').click()
    const nav = cy.get('[data-testid="nav"]')
    nav.should('be.visible')
    cy.get('[data-testid="nav"]').find('[data-testid="close-menu-button"]').click() 
    nav.should('not.be.visible')  
  })
  it('toggles navigation for layout two on click of menu button', () => {
    cy.mount(<LayoutTwo title={'Hello world'} description={'page description'} ><LayoutChild /></LayoutTwo>)
    cy.get('[data-testid="nav-desktop"]').should('not.exist') 
    cy.get('button[data-testid="menu-button"]').should('have.text', 'menu').click()
    const nav = cy.get('[data-testid="nav"]')
    nav.should('be.visible')
    cy.get('[data-testid="close-menu-button"]').click() 
    nav.should('not.be.visible')  
  })
})

describe('renders admin dashboard layout with header, navigation, logo and children', () => {
  it('renders admin layout', () => {
    cy.mount(<AdminLayout  title={'Hello world'} description='page description'><LayoutChild /></AdminLayout>)
    cy.get('header').should('be.visible')
    cy.get('[data-testid="admin-nav-toggle"]').should('be.visible').click()
    cy.get('nav').should('exist')
    cy.get('main').should('contain', 'Hello world')
  })
})

export {}