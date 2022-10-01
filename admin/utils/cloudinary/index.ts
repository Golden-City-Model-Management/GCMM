
import Request from "../api/request";

export async function uploadFile({
  file, folder, upload_preset
}:{
  file: string | Blob,
  folder: string, upload_preset: string
}) {
  try{
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', upload_preset)
    formData.append('folder', folder)
    const response = await Request({
      baseURL: process.env.NEXT_PUBLIC_CLOUDINARY,
      path: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
      method: 'post',
      data: formData,
      withCredentials: false
   })
   return await response
  }catch(err){
    console.error(err)
    return null
  }
}

export const deleteWithToken = async (token: string, public_id: string) => {
  const data = new FormData()
  data.append('token', token)
  data.append('public_id', public_id)
  const isDeleted = await Request({baseURL: process.env.NEXT_PUBLIC_CLOUDINARY || '',
  path: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/delete_by_token`,
   withCredentials: false, method: 'post', data,  
   headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
  return isDeleted
}