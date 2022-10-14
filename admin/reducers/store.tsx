
import { useReducer, useMemo, createContext, ReactNode, useCallback, Dispatch } from 'react'
import modelsSlice, { ModelsState } from './models/reducer'
import userSlice, { userState } from './user/reducer'
import notificationSlice, { notificationState } from './notification/reducer'
import uiSlice, { uiState } from './ui/reducer'
import gallerySlice, { GalleryState } from './gallery/reducer'
import feedbackSlice, { FeedbackState } from './feedbacks/reducer'

import { Polaroids, Socials, Image } from '@/types/models'

type Slices = {
  [index: string]: (state: any, action: {type: any, payload: any}) => any
}
type Action = { type: any, payload: any}

const initialState: {
  models: ModelsState, 
  notification: notificationState, 
  user: userState
  ui: uiState,
  gallery: GalleryState,
  feedbacks: FeedbackState,
} = { 
  models: {
  models: [], modelsDisplayed: [], loading: true, searchTerm: '',
  model: {
    name: '', gender: '', dob: '',
    cover_image: {} as Image, waist: 0, 
    chest: 0, bust: 0, hips: 0,
    height: 0, shoe: 0, id: '', 
    isActive: true, socials: {} as Socials,
    polaroids: {} as Polaroids,
    extra_polaroids: [], is_main_board: 'no',
    portfolio: [], is_new_face: 'no',
    first_name: '', last_name: '', hair_color: '',
    eye_color: ''
  }
  },
  notification: {
    type: undefined,
    message: '',
    show: false
  },
  user: {
    _id: '',
    name: '',
    avatar: '',
    email: '',
    userName: '',
    role: '', 
  },
  ui: {
    drawerWidth: 340,
    bodyWidth:  `calc(100% - 340px)`,
    showNav: false,
    fullHeightWithoutHeader: 'calc(100vh - 89px)',
    boxPadding: {
      lg: '0 119px',
      md: '0 50px',
      xs: '0 30px',
    },
    marginBtwContainers: '100px',
  },
  gallery: {
    images: []
  },
  feedbacks: {
    feedbacks: []
  }
 }

export const StoreContext = createContext({state: initialState, 
  combinedDispatch: {
  notificationDispatch: (action: Action) => {},
  modelsDispatch: (action: Action) => {},
  userDispatch: (action: Action) => {},
  uiDispatch: (action: Action) => {},
  galleryDispatch: (action: Action) => {},
  feedbackDispatch: (action: Action) => {},
}})

const StoreProvider = ({ children }: {
  children: ReactNode | ReactNode[]
}) => {
  const [uiState, uiDispatch] = useReducer(uiSlice, initialState.ui as never)
  const [modelsState, modelsDispatch] = useReducer(modelsSlice, initialState.models)
  const [notificationState, notificationDispatch] = useReducer(notificationSlice, initialState.notification)
  const [userState, userDispatch] = useReducer(userSlice, initialState.user)
  const [feedbackState, feedbackDispatch] = useReducer(feedbackSlice, initialState.feedbacks) 
  const [galleryState, galleryDispatch] = useReducer(gallerySlice, initialState.gallery)

  const state = useMemo(() => ({
    models: modelsState,
    notification: notificationState, 
    feedbacks: feedbackState,
    user: userState, 
    ui: uiState, 
    gallery: galleryState
  }), 
  [feedbackState, galleryState, modelsState, notificationState, uiState, userState])

  const combinedDispatch = useMemo(() => 
  ({
    notificationDispatch, 
    feedbackDispatch, 
    modelsDispatch, 
    userDispatch, 
    uiDispatch,  
    galleryDispatch}),  
  [modelsDispatch, notificationDispatch, userDispatch, uiDispatch, feedbackDispatch])

  return (
    <StoreContext.Provider value={{state, combinedDispatch}}> {children} </StoreContext.Provider>
  );
};

export default StoreProvider

export * as modelsReducer  from './models/reducer'
export * as notificationReducer from './notification/reducer'
export * as userReducer from './user/reducer'
export * as galleryReducer from './gallery/reducer'
export * as feedbacksReducer from './feedbacks/reducer'