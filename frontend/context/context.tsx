

import React, {  createContext, useCallback } from 'react'
import { ReactNode, useState, useMemo } from 'react'
import  useToggle from '@/utils/hooks/useToggle'


const initialValue = {
  drawerWidth: 340,
  bodyWidth:  `calc(100% - 340px)`,
  showNav: false,
  toggleShowNav: () => {},
  fullHeightWithoutHeader: 'calc(100vh - 89px)',
  containerPadLayout1: {
    lg: '0 119px',
    md: '0 50px',
    xs: '0 30px',
  },
  layout2ContainerPad:  {
    lg: '0 55px',
    md: '0 35px',
    xs: '0 15px',
  },
  marginBtwContainers: '100px',
  modal: {
    content: '' as ReactNode | ReactNode[],
    open: false,
  },
  closeModal: () => {},
  openModal: (content: ReactNode | ReactNode[]) => {}
}

export const UIContext = createContext(initialValue)

const UIProvider = ({ children }:
   { children: ReactNode | ReactNode[] }) => {

  const [showNav, toggleShowNav] = useToggle(false)
  const [modal, setModal] = useState({
    open: false, content: '' as ReactNode | ReactNode[]
  })

  const openModal = useCallback((content: ReactNode | ReactNode[]) => setModal({open: true, content}) , [])
  const closeModal = useCallback(() => {
    setModal(prev => ({...prev, open: false, content: ''}))
  }, [])

  const value = useMemo(() => ({
    ...initialValue,
    showNav, toggleShowNav,
    modal, closeModal, openModal
  }), [closeModal, modal, openModal, showNav, toggleShowNav])
  
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider