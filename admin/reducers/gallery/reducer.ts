import { Model } from "@/types/models"
import { GalleryState, updateGallery, } from './actionHandlers'

type action = {
  type: 'UPDATE_GALLERY',
  payload: Model[] | boolean
}

export const actionHandlers = (state: GalleryState, payload: any) => ({
  'UPDATE_GALLERY': () => updateGallery(state, payload),
})

export const galleryActions = {
  updateGallery: 'UPDATE_GALLERY',
}

export default function reducer(state: GalleryState, action: action) {
  const dispatcher = actionHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionHandlers(state, action.payload)[action.type]()
  }else{
    throw new Error(`the action type ${action.type} is not a valid gallery action type`)
  }
}

export * from  './actionHandlers'