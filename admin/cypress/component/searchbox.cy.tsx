
import SearchBox from '@/components/common/searchbox'
import * as React from 'react'

const SearchBoxCaller = () => {
  const [value, setValue] = React.useState('')
  return (
    <SearchBox value={value} handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
  )
}

describe('Searchbox', () => {
  it('Allows text to be typed into', () => {
    cy.mount(<SearchBoxCaller />)
    cy.get('input').click().type('Hello world')
    cy.get('input').should('have.value', 'Hello world')
  })
})

export {}