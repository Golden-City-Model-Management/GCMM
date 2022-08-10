
import CloseIcon from '@mui/icons-material/Close';
import { HideInDesktop, IconOrTextBtn } from "@/components/common/bones"


describe('HideInDesktop hides children in desktop and shows on mobile', () => {
  it('hides in desktop', {
    viewportHeight: 600,
    viewportWidth: 1200,
  }, () => {
    cy.mount(<HideInDesktop hideInDesktop={true}><div>Hello world</div></HideInDesktop>)
    cy.get('div').should('not.be.visible')
  }) 
  it('shows in mobile', {
    viewportHeight: 600,
    viewportWidth: 600,
  }, () => {
    cy.mount(<HideInDesktop hideInDesktop={true}><div>Hello world</div></HideInDesktop>)
    cy.get('div').should('be.visible')
  })
})

describe('IconOrTextBtn renders icon or text button', () => {
  it('renders text', () => {
    cy.mount(<IconOrTextBtn onClick={() => null} Icon='Hello world' />)
    cy.get('button').should('have.text', 'Hello world')
  })
  it('renders icon', () => {
    cy.mount(<IconOrTextBtn Icon={CloseIcon} onClick={() => null} />)
  })
})


export {}