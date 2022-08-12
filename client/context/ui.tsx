

import {  createContext } from 'react'
import { ReactNode } from 'react'
import  useToggle from '@/utils/hooks/useToggle'

const initialValue = {
  drawerWidth: 340,
  bodyWidth:  `calc(100% - 340px)`,
  showNav: false,
  toggleShowNav: () => {},
  fullHeightWithoutHeader: 'calc(100vh - 89px)',
  universalContainerPadding: {
    lg: '0 119px',
    md: '0 50px',
    xs: '0 30px',
  },
  marginBtwContainers: '100px'
}

export const UIContext = createContext(initialValue)

const UIProvider = ({ children }:
   { children: ReactNode | ReactNode[] }) => {

  const [showNav, toggleShowNav] = useToggle(false)

  const value = {
    ...initialValue,
    showNav, toggleShowNav
  }
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider