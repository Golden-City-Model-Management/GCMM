
import { Image } from '@/types/models'
import ClientRequest from '@/utils/api/request'

export const limit = 15

export interface GalleryState {
  images: Image[],
}

type FetchImagesResponse = {
    docs: Image[],
    statusCode: number,
    status: string,
    total_count: number,
    error: boolean, message: string,
}

export const fetchImages = async (query?: { [key: string]: string }[]): Promise<FetchImagesResponse> => {
  const queryString = query?.map(el => Object.keys(el).map(key => `${key}=${el[key as keyof typeof el]}`).join('&')).join()
  try {
    let res = await ClientRequest({ path: `/gallery?${queryString ? queryString : ''}`, method: 'get' })
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
export const updateGallery = (state: GalleryState, payload: Image[]) => {
  const stringifiedUpd = payload.map(img => JSON.stringify(img))
  const stringImgs = state.images.map(img => JSON.stringify(img))
  const uniqueImgStrs = new Set([...stringImgs, ...stringifiedUpd,])
  const uniqueImgs = [...uniqueImgStrs].map((strImg: string) => JSON.parse(strImg))
  return { ...state, images: uniqueImgs }
}
