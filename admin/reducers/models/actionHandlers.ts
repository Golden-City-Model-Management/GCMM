
import { Model, ModelWithPolaroidsAndPortfolio } from '@/types/models'
import ClientRequest from '@/utils/api/request'


export const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
export const limit = 15

export interface ModelsState {
  models: Model[],
  modelsDisplayed: Model[],
  loading: boolean,
  searchTerm: string,
  model: ModelWithPolaroidsAndPortfolio,
}

type FetchModelsResponse = {
    docs: Model[],
    statusCode: number,
    status: string,
    total_count: number,
    error: boolean, message: string,
}

export const fetchModels = async (query?: { [key: string]: string }[]): Promise<FetchModelsResponse> => {
  const queryString = query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
  try {
    let res = await ClientRequest({ path: `/models?${queryString ? queryString : ''}&fields=${fields}`, method: 'get' })
    const data = await res.data
    console.log(res)
    if (res.statusCode === 200) {
      return { ...res, error: false,}
    } else {
      return { ...res, error: true,}
    }
  } catch (err: any) {
    console.error(err);
    return { 
      docs: [], total_count: 0, status: 'failed', statusCode: err.code,
      error: true, message: err.message }
  }
}

export const handleSearchTermChange = (state: ModelsState, payload: string) => {
  return { ...state, searchTerm: payload }
}
export const updateModels = (state: ModelsState, payload: Model[]) => {
  console.log(Array.isArray(payload), payload, '')
  const stringifiedUpd = payload.map(model => JSON.stringify(model))
  const stringifiedCurrentModels = state.models.map(model => JSON.stringify(model))
  const uniqueModelsString = new Set([...stringifiedCurrentModels, ...stringifiedUpd,])
  const uniqueModels = [...uniqueModelsString].map((strModel: string) => JSON.parse(strModel))
  return { ...state, models: uniqueModels }
}
export const updateLoading = (state: ModelsState, payload: boolean) => {
  return { ...state, loading: payload }
}

export const updateSingleModel = (state: ModelsState, payload: ModelWithPolaroidsAndPortfolio) => {
  console.log(payload)
  return {...state, model: payload}
}

