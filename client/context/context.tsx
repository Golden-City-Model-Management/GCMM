

import {  createContext, useCallback } from 'react'
import { ReactNode, useState } from 'react'
import  useToggle from '@/utils/hooks/useToggle'

interface Model {

}
interface ImageInterface {
kjk: 'u'
}
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
  marginBtwContainers: '100px',
  mainBoard: [] as Model[],
  newFaces: [] as Model[],
  women: [] as Model[],
  men: [] as Model[],
  gallery: [] as ImageInterface[],
  updateState: (payload: Model[], state: 'men' | 'women' | 'mainBoard' | 'newFaces'): void => {}
}

export const UIContext = createContext(initialValue)

const UIProvider = ({ children }:
   { children: ReactNode | ReactNode[] }) => {

  const [showNav, toggleShowNav] = useToggle(false)
  const [mainBoard, setMainBoard] = useState<Model[]>([])
  const [women, setWomen] = useState<Model[]>([])
  const [men, setMen] = useState<Model[]>([])
  const [newFaces, setNewFaces] = useState<Model[]>([])
  const [gallery, setGallery] = useState<ImageInterface[]>([])

  const updateState = useCallback((payload: Model[] | ImageInterface[], state: 
    'men' | 'women' | 'mainBoard' | 'newFaces' | 'gallery') => {
    switch(state){
      case 'men': return setMen(payload as Model[]);
      case 'women': return setWomen(payload as Model[]);
      case 'mainBoard': return setMainBoard(payload as Model[]);
      case 'newFaces': return setNewFaces(payload as Model[]);
      case 'gallery': return setGallery(payload as ImageInterface[]);
      default: return;
    }
  }, [])
  const value = {
    ...initialValue,
    men, women, mainBoard, newFaces, 
    updateState, gallery,
    showNav, toggleShowNav
  }
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider