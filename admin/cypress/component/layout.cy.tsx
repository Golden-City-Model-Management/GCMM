

import AdminLayout from '@/components/layout/Layout'

const LayoutChild = () => <div>Hello world</div>
  
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