

export const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
export const limit = 15

export interface notificationState {
  type: 'error' | 'success' | 'primary' | undefined,
  message: string,
  show: boolean
}

export const clearNotification = (state: notificationState, payload: undefined ) => {
  return { type: undefined, message: '', show: false }
}

export const showNotification = (state: notificationState, payload: notificationState ) => {
  return {...state, ...payload}
}

