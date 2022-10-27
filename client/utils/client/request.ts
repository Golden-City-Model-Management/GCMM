
import axios from 'axios'
import setUpInterceptors from './interceptors'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
  returnErr?: boolean
}

let myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:9876/api/v1',
})

myAxios = setUpInterceptors(myAxios)

async function Request ({
  baseURL,
  path,
  method = 'GET',
  data = {},
  returnErr,
}: RequestInterface) {

  if(baseURL) myAxios.defaults.baseURL = baseURL

  try{

   const response = await myAxios({
      method,
      url: path,
      data,
    })
   return { ...response.data, statusCode: response.status }
  }catch(err: any){
    console.error(err)
    if(returnErr){
      return err
    }
    throw new Error(err)
  }
}

export default Request
