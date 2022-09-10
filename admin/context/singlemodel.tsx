

import { createContext, ReactNode, useCallback, useState  } from "react";
import { ModelWithPolaroidsAndPortfolio, Polaroids, Socials } from "@/types/models";

const modelInitialState: ModelWithPolaroidsAndPortfolio = {
  name: '', gender: '', dob: '',
  cover_image: '', waist: 0, 
  chest: 0, bust: 0, hips: 0,
  height: 0, shoe: 0, id: '', 
  isActive: true, socials: {} as Socials,
  polaroids: {} as Polaroids,
  extra_polaroids: [],
  portfolio: []
}
const initialState = {
  model: modelInitialState,
  updateModel: (newState: ModelWithPolaroidsAndPortfolio) => {}
}
export const ModelContext = createContext(initialState)

const ModelContextProvider = ({ children }:{
  children: ReactNode | ReactNode[]
}) => {

  const [model, setModel] = useState<ModelWithPolaroidsAndPortfolio>(modelInitialState)

  const updateModel = useCallback((newState: ModelWithPolaroidsAndPortfolio) => {
    setModel(newState)
  }, [])

  const value = {
    model, updateModel
  }
  return (
    <ModelContext.Provider value={value}>
      {children}
    </ModelContext.Provider>
  )
}

export default ModelContextProvider