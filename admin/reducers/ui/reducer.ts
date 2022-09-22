

import { toggleShowNav, uiState } from './actionHandlers'

type action = {
  type: 'TOGGLE_SHOW_NAV',
  payload: uiState | boolean 
}

export const uiActions = {
  toggleShowNav: 'TOGGLE_SHOW_NAV',
}

export const actionsHandlers = (state: uiState, payload: any) => ({
  'TOGGLE_SHOW_NAV': () => toggleShowNav(state, payload),
}) 

export default function reducer(state: uiState, action: action) {
  console.log(actionsHandlers(state, action.payload)[action.type])
  const dispatcher = actionsHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionsHandlers(state, action.payload)[action.type]() 
  }else{
    throw new Error(`the action type ${action.type} is not a valid ui action type`)
  }
}

export * from './actionHandlers'