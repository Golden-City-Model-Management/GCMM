

import LayoutOne from '@/components/layout/LayoutOne';
import LayoutTwo from '@/components/layout/LayoutTwo';

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


export {}