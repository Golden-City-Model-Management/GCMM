

import { render } from '@testing-library/react'
import { ReactElement, JSXElementConstructor } from 'react'
import ContextProvider from '@/context/provider'



const RenderWithContext = (ui: ReactElement<any, string | JSXElementConstructor<any>>) => {
  
  const wrapper = ({children}: {children: ReactElement<any, string | JSXElementConstructor<any>>}) => {
    return (
      <>{ContextProvider(children)}</>
    )
  }

  return render(ui, { wrapper })
}

export * from '@testing-library/react'
export { RenderWithContext as render }