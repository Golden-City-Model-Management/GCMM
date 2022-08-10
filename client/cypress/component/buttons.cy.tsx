
import { StyledBorderBtn } 
from '@/components/common/Buttons';

describe('StyledBorderBtn is rendered is rendered as button but as anchor tag if href attribute is present', () => {
  it('renders styled border button as button', () => {
    cy.mount(<StyledBorderBtn>Hello World</StyledBorderBtn>)
    cy.get('button').should('have.text', 'Hello World')
  })
  it('renders styled border button as link', () => {
    cy.mount(<StyledBorderBtn  href='/about-us'>Hello World</StyledBorderBtn>)
    cy.get('a').should('have.text', 'Hello World')
  })    
})
 
export {} 