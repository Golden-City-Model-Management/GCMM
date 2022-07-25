

import { screen, render, renderWithSetup } from '@/utils/test.utils';
import  LayoutOne  from '@/components/layout/LayoutOne';
import  LayoutTwo  from '@/components/layout/LayoutTwo';
import { LayoutProps } from '@/types/layout';

const RenderWithProps = (
 { Layout, props}: {
  Layout: React.ComponentType<LayoutProps>,
  props: LayoutProps 
 }) => {
  return (
    <>
    {<Layout
      children={props.children}
      title={props.title}
      description={props.description}
      favicon={props.favicon}  />}
    </>
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
    expect(screen.getByTestId(/logo/i).closest('header')).toBeInTheDocument()
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
  title: 'This is the first layout',
  description: 'This is the first layout description',
  favicon: 'https://via.placeholder.com/300x300'
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
    const { user } = renderWithSetup(<RenderWithProps Layout={LayoutTwo} props={props} />)
    const menuButton = screen.getByRole('button', {name: /menu/i})
    expect(menuButton).toBeInTheDocument()
    expect(screen.queryByTestId('nav')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', {name: /menu/i}))
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    testSemanticNav() 
  })
}) 