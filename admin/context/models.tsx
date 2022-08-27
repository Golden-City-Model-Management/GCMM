import { createContext, ReactNode, useCallback, useState } from "react";

export interface Model {
  name: string, age: number, gender: string, 
  cover_image: string, waist: number, 
  chest?: number, bust?: number, hips?: number,
  height: number, shoe: number, id: string
}

const initailModelsState: {
  models: Model[],
  updateModels: (arg1: Model[]) => void
} = {
  models: [],
  updateModels: () => {}
}

export const ModelsContext = createContext(initailModelsState)

const ModelsProvider = ({ children }: {
  children: ReactNode
}) => {
  const [models, setModels] = useState(initailModelsState.models)

  const updateModels = useCallback((updatingModels: Model[]) => {
    setModels(existingModels => {
      const stringifiedUpd = updatingModels.map(model => JSON.stringify(model))
      const stringifiedCurrentModels = existingModels.map(model => JSON.stringify(model))
      const uniqueModelsString = new Set([...stringifiedUpd, ...stringifiedCurrentModels])
      const uniqueModels = [...uniqueModelsString].map((strModel: string) => JSON.parse(strModel))
      return uniqueModels
    })
  }, [])
  
  const modelsProviderValue = {
    models,
    updateModels,
  }
  return (
    <ModelsContext.Provider value={modelsProviderValue}>
      {children}
    </ModelsContext.Provider>
  )
}

export default ModelsProvider