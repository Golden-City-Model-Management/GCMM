import { Model } from "@/types/models"
import { updateModels, updateLoading, ModelsState, handleSearchTermChange, updateSingleModel } from './actionHandlers'

type action = {
  type: 'UPDATE_MODELS' | 'UPDATE_LOADING' | 'HANDLE_SEARCHTERM_CHANGE',
  payload: Model[] | boolean
}

export const actionHandlers = (state: ModelsState, payload: any) => ({
  'UPDATE_MODELS': () => updateModels(state, payload),
  'UPDATE_LOADING': () => updateLoading(state, payload),
  'HANDLE_SEARCHTERM_CHANGE': () => handleSearchTermChange(state, payload),
  'UPDATE_SINGLE_MODEL': () => updateSingleModel(state, payload)
})

export const modelsActions = {
  updateLoading: 'UPDATE_LOADING',
  updateModelsDisplayed: 'UPDATE_MODELS_DISPLAYED',
  updateModels: 'UPDATE_MODELS',
  handleSearchTermChange: 'HANDLE_SEARCHTERM_CHANGE',
  updateSingleModel: 'UPDATE_SINGLE_MODEL',
}

export default function reducer(state: ModelsState, action: action) {
  const dispatcher = actionHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionHandlers(state, action.payload)[action.type]()
  }else{
    throw new Error(`the action type ${action.type} is not a valid models action type`)
  }
}

export * from  './actionHandlers'