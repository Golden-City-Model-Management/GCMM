import ClientRequest from "@/utils/client/request";
import { createContext, ReactNode, useCallback, useState } from "react";

export interface Model {
  name: string, gender: string, dob: string,
  cover_image: string, waist: number, 
  chest?: number, bust?: number, hips?: number,
  height: number, shoe: number, id: string
}

const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
const limit = 15

const initailModelsState: {
  models: Model[],
  modelsDisplayed: Model[],
  updateModelsDisplayed: (arg1: Model[]) => void
  updateModels: (arg1: Model[]) => void,
  errorDisplayTxt: string,
  notification: {
    type?: 'error' | 'success' | 'info',
    message: string,
    show: boolean
  },
  setErrorDisplayTxt: (arg1: string) => void,
  loading: boolean,
  getModels: (query?: {[key: string]: string}[]) => Promise<Model[]>,
  updateNotification: (newValues: {
    type?: 'error' | 'success' | 'info',
    message?: string, show?: boolean
  }) => void,
  setLoading: (loading: boolean | ((loading: boolean) => boolean)) => void
} = {
  models: [],
  updateModels: () => {},
  updateModelsDisplayed: () => {},
  modelsDisplayed: [],
  errorDisplayTxt: '',
  notification: {
    type: undefined,
    message: '',
    show: false
  },
  loading: false,
  setErrorDisplayTxt: () => {},
  getModels: async () => ([]),
  updateNotification: () => {},
  setLoading: () => {}
}

export const ModelsContext = createContext(initailModelsState)

const ModelsProvider = ({ children }: {
  children: ReactNode
}) => {
  const [models, setModels] = useState(initailModelsState.models)
  const [modelsDisplayed, setModelsDisplayed] = useState(models)
  const [errorDisplayTxt, setErrorDisplayTxt] = useState('')
  const [notification, setNotification] = useState(initailModelsState.notification)
  const [loading, setLoading] = useState(true)

  const updateModels = useCallback((updatingModels: Model[]) => {
    setModels(existingModels => {
      const stringifiedUpd = updatingModels.map(model => JSON.stringify(model))
      const stringifiedCurrentModels = existingModels.map(model => JSON.stringify(model))
      const uniqueModelsString = new Set([ ...stringifiedCurrentModels, ...stringifiedUpd,])
      const uniqueModels = [...uniqueModelsString].map((strModel: string) => JSON.parse(strModel))
      return uniqueModels
    })
  }, [])

  const updateModelsDisplayed = useCallback((modelsToDisplay: Model[]) => {
    setModelsDisplayed(modelsToDisplay)
  }, [])

  const updateNotification = useCallback((newNotif) => {
    setNotification(prev => ({...prev, ...newNotif}))
  }, [])
  
  const getModels = useCallback(async (query?:
    { [key: string]: string }[]) => {
    const queryString = query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
    try {
      let res = await ClientRequest({ path: `/models?${queryString ? queryString : ''}&fields=${fields}&limit=${limit}`, method: 'get' })
      const data = res.data
      if (data.statusCode === 200) {
        setNotification(prev => ({ ...prev, message: data.message, show: true, type: 'success' }))
        setErrorDisplayTxt('')
        return data.docs
      } else {
        setNotification(prev => ({
          ...prev, message: `${data.message}`,
          show: true, type: 'error'
        }))
      }
    } catch (err: any) {
      console.error(err)
      setNotification(prev => ({
        ...prev, message: `${err.response.data.message} Please check your internet connection!`,
        show: true, type: 'error'
      }))
      return []
    } finally {
      setLoading(false)
    }
  }, [])
  
  const modelsProviderValue = {
    models,
    modelsDisplayed,
    updateModelsDisplayed,
    updateModels,
    errorDisplayTxt,
    setErrorDisplayTxt,
    notification,
    loading,
    getModels,
    updateNotification,
    setLoading
  }
  return (
    <ModelsContext.Provider value={modelsProviderValue}>
      {children}
    </ModelsContext.Provider>
  )
}

export default ModelsProvider