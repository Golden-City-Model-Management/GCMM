

import { clearNotification, showNotification, notificationState } from './actionHandlers'

type action = {
  type: 'CLEAR_NOTIFICATION' | 'SHOW_NOTIFICATION',
  payload: notificationState | boolean
}

export const notificationActions = {
  clearNotification: 'CLEAR_NOTIFICATION',
  showNotification: 'SHOW_NOTIFICATION',
}

export const actionsHandlers = (state: notificationState, payload: any) => ({
  'CLEAR_NOTIFICATION': () => clearNotification(state, payload),
  'SHOW_NOTIFICATION': () => showNotification(state, payload),
}) 

export default function reducer(state: notificationState, action: action) {
  console.log(actionsHandlers(state, action.payload)[action.type])
  const dispatcher = actionsHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionsHandlers(state, action.payload)[action.type]() 
  }else{
    throw new Error(`the action type ${action.type} is not a valid notification action type`)
  }
}

export * from './actionHandlers'