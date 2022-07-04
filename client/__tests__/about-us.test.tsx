
import { screen, render } from '@testing-library/react'
import AboutUs from '@/pages/about-us'


describe('About us page is rendered with appropriate elements', () => {

  it('renders a main element', () => {
    render(<AboutUs />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders a heading', () => {
    render(<AboutUs />)
    expect(screen.getByRole('heading',
     {name: /about us/i})).toBeInTheDocument()
  })

  it('renders call to action', () => {
    render(<AboutUs />)

    const cta = screen.getByRole('link', { name: /join our team/i})
   
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href')
  })
})