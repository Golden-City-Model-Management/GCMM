
import { render, screen, renderWithLayout } from '@/utils/test.utils'
import Home from '@/pages/index'

describe('Home page is rendered with appropriate elements', () => {

  it('renders a main element', () => {
    render(renderWithLayout(Home))
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
  
  it('renders a heading', () => {
    render(renderWithLayout(Home))
    const heading = screen.getByRole('heading', {
      name: /Golden City Model Management/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders call to action', () => {
    render(renderWithLayout(Home))

    const callToActions = screen.getByTestId('ctas')
    
    expect(callToActions).toBeInTheDocument()
    Array.from( callToActions.getElementsByTagName('a')).forEach((link: HTMLAnchorElement) => {
      const linkText = link.textContent
      const linkHref = new URL(link.href)
      expect(linkText?.split(' ').join('-').toLowerCase()).toBe(linkHref.pathname.split('/')[1])
    });length
  })

  it('renders gallery section with heading and links', () => {
    render(renderWithLayout(Home))
    const gallery = screen.getByTestId('gallery-preview')
    const heading = screen.getByRole('heading', {name: /talent at its finest/i})
    expect(gallery).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(screen.getByTestId('gallery-preview-link')).toHaveAttribute('href', '/gallery')
  }) 
}) 