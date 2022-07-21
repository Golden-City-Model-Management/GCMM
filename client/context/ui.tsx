

import { useState, useCallback, createContext } from 'react'
import { ReactNode } from 'react'

const initialValue = {
  drawerWidth: 340,
  bodyWidth:  `calc(100% - ${339}px)`,
  showNav: false,
  toggleShowNav: () => {},
  fullHeightWithoutHeader: 'calc(100vh - 89px)'
}

export const UIContext = createContext(initialValue)

const UIProvider = ({ children }:
   { children: ReactNode | ReactNode[] }) => {

  const [showNav, setShowNav] = useState<boolean>(false)
  
  const toggleShowNav = useCallback(() => {
    setShowNav(prev => !prev)
  }, [setShowNav])

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