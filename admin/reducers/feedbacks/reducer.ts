import { Model } from "@/types/models"
import { FeedbackState, updateFeedbacks, } from './actionHandlers'

type action = {
  type: 'UPDATE_FEEDBACKS',
  payload: {
    name: string, email: string, _id: string, message: string,
  }[] 
}

export const actionHandlers = (state: FeedbackState, payload: any) => ({
  'UPDATE_FEEDBACKS': () => updateFeedbacks(state, payload),
})

export const feedbackActions = {
  updateFeedbacks: 'UPDATE_FEEDBACKS',
}

export default function reducer(state: FeedbackState, action: action) {
  const dispatcher = actionHandlers(state, action.payload)[action.type]
  if(dispatcher !== undefined){
    return actionHandlers(state, action.payload)[action.type]()
  }else{
    throw new Error(`the action type ${action.type} is not a valid feedback action type`)
  }
}

export * from  './actionHandlers'