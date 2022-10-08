
import ClientRequest from '@/utils/api/request'

export const limit = 20

export interface FeedbackState {
  feedbacks: {
    name: string, email: string, _id: string, message: string,
  }[],
}

type FetchImagesResponse = {
    docs: {
      name: string, email: string, _id: string, message: string,
    }[],
    statusCode: number,
    status: string,
    total_count: number,
    error: boolean, message: string,
}

export const fetchFeedbacks = async (query?: { [key: string]: string }[]): Promise<FetchImagesResponse> => {
  const queryString = query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
  try {
    let res = await ClientRequest({ path: `/feedback?${queryString ? queryString : ''}`, method: 'get' })
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
export const updateFeedbacks = (state: FeedbackState, payload: FetchImagesResponse['docs']) => {
  const stringifiedUpd = payload.map(img => JSON.stringify(img))
  const stringFeedbacks = state.feedbacks.map(img => JSON.stringify(img))
  const uniqueStrFeedbacks = new Set([...stringFeedbacks, ...stringifiedUpd,])
  const uniqueFeedbacks = [...uniqueStrFeedbacks].map((strFb: string) => JSON.parse(strFb))
  return { ...state, feedbacks: uniqueFeedbacks }
}
