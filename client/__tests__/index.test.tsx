
import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home page is rendered with appropriate elements', () => {

  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /GoldenCity Model Management/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders call to action', () => {
    render(<Home />)
    const callToActions = screen.getByTestId('ctas')
    expect(callToActions).toBeInTheDocument()
    Array.from( callToActions.getElementsByTagName('a')).forEach((link: HTMLAnchorElement) => {
      const linkText = link.textContent
      const linkHref = new URL(link.href)
      expect(linkText?.split(' ').join('-').toLowerCase()).toBe(linkHref.pathname.split('/')[1])
    });length
  })

  it('renders gallery section with heading and links', () => {
    render(<Home />)
    const gallery = screen.getByTestId('gallery')
    const heading = screen.getByRole('heading', {name: /talent at its finest/i})
    const galleryLink = gallery.getElementsByTagName('a')[0]
    const galleryHref = new URL(galleryLink.href)

    expect(heading).toBeInTheDocument()
    expect(gallery).toBeInTheDocument()
    expect(galleryLink).toBeInTheDocument()
    expect(galleryHref.pathname.split('/')[1]).toBe("gallery")
  })
})