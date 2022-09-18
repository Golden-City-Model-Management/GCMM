

import { updateUser, userState } from './actionHandlers'

type action = {
  type: 'UPDATE_USER',
  payload: userState
}

export const userActions = {
  updateUser: 'UPDATE_USER',
}

export const actionsHandlers = (state: userState, payload: any) => ({
  'UPDATE_USER': () => updateUser(state, payload),
}) 

export default function reducer(state: userState, action: action) {
  const dispatcher = actionsHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionsHandlers(state, action.payload)[action.type]() 
  }else{
    throw new Error(`the action type ${action.type} is not a valid user action type`)
  }
}

export * from './actionHandlers'