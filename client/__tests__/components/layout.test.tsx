


import { screen, render } from '@testing-library/react';
import  userEvent from '@testing-library/user-event'
import  LayoutOne  from '@/components/layout/LayoutOne';
import  LayoutTwo  from '@/components/layout/LayoutTwo';
import { LayoutProps } from '@/types/layout';

const RenderWithProps = (
 { Layout, props}: {
  Layout: React.ComponentType<LayoutProps>,
  props: LayoutProps
 }) => {
  return (
    <Layout
      children={props.children}
      pageTitle={props.pageTitle}
      pageDescription={props.pageDescription}
      pageFavicon={props.pageFavicon}  />
  )
}

const testSemanticNav = () => {
  const navLinks = screen.getAllByRole('link')
  const listItems = []
  navLinks.forEach(el => {
   if(el.closest('ul')) 
     listItems.push(el.closest('li'))
  })
  expect(navLinks.length).toBeGreaterThanOrEqual(listItems.length)
}

const testLayout = (Layout: React.ComponentType<LayoutProps>, props:LayoutProps) => {
  return  () => {
    render(<RenderWithProps Layout={Layout} props={props} />);
    const nav = screen.getByRole('navigation')
    testSemanticNav()
    expect(nav).toBeInTheDocument()
 }
}
const testLogo = (Layout: React.ComponentType<LayoutProps>, props: LayoutProps) => {
  return () => {
    render(<RenderWithProps Layout={Layout} props={props} />)
    expect(screen.getByAltText(/golden city model managemnt logo. A Capital Letter C enclosing a capital letter G/i).closest('header')).toBeInTheDocument()
  }
}

const testChildren = (Layout: React.ComponentType<LayoutProps>, props: LayoutProps) => { 
  return () => {
    render(<RenderWithProps Layout={Layout} props={props} />)
    const children = screen.getByText(/children/i)
    expect(children).toBeInTheDocument()
    expect(children.closest('nav')).not.toBeInTheDocument()
    expect(children.closest('header')).not.toBeInTheDocument()
  }
}
const props: LayoutProps = {
  children: <div>Children</div>,
  pageTitle: 'This is the first layout',
  pageDescription: 'This is the first layout description',
  pageFavicon: 'https://via.placeholder.com/300x300'
}

describe('Renders Layout One', () => {
  it('Navigation is present and rendered semantically', testLayout(LayoutOne, props));
  it('renders a header element with the logo', testLogo(LayoutOne, props));
  it('renders children outside of navigation', testChildren(LayoutOne, props));
}) 

describe('Renders Layout Two', () => {
  it('renders a header element with the logo', testLogo(LayoutTwo, props));
  it('renders children outside of navigation', testChildren(LayoutTwo, props));
  it('renders functional menu button and toggles navigation onclick of menu button', async () => {
    render(<RenderWithProps Layout={LayoutTwo} props={props} />)
    const menuButton = screen.getByRole('button', {name: /menu/i})
    expect(menuButton).toBeInTheDocument()
    await userEvent.click(menuButton)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    await userEvent.click(menuButton)
    expect(nav).not.toBeInTheDocument()
  })

  it('renders navigation semantically', async () => {
    render(<RenderWithProps Layout={LayoutTwo} props={props} />)
    const nav = screen.queryByRole('navigation')
    expect(nav).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', {name: /menu/i}))
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    testSemanticNav()
  })
})