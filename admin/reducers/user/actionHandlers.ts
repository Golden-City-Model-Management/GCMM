

export const fields = 'name,age,gender,cover_image,hips,waist,chest,height,shoe,id'
export const limit = 15

export interface userState {
  _id: string,
  name: string,
  avatar: string,
  email: string,
  userName: string,
  role: string,
}

export const updateUser = (state: userState, payload: userState) => {
  return { ...state, ...payload }
}
