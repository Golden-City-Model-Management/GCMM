

import { ReactElement, JSXElementConstructor } from 'react'
import { render, } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'
import ContextProvider from '@/context/provider'
import { NextPageWithLayout } from '@/types/pages'

const renderWithContext = (ui: ReactElement<any, string | JSXElementConstructor<any>>) => {
  
  const wrapper = ({children}: {children: ReactElement<any, string | JSXElementConstructor<any>>}) => {
    return (
      <>{ContextProvider(children)}</>
    )
  }

  return render(ui, { wrapper })
}

const renderWithSetup = (jsx: ReactElement<any, string | JSXElementConstructor<any>>) => ({user: userEvent.setup(), ...renderWithContext(jsx)})

const renderWithLayout = (Component: NextPageWithLayout) => (<>{Component.getLayout(<Component />)}</>)

export * from '@testing-library/react'
export { renderWithContext as render, renderWithSetup, renderWithLayout }