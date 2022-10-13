
import axios from 'axios'
import { AxiosResponse, AxiosError} from "axios";
import setUpInterceptors from './interceptors'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
}

let myAxios = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:9876/api/v1',
})

myAxios = setUpInterceptors(myAxios)

async function Request ({
  baseURL,
  path,
  method = 'GET',
  data = {},
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
    if (err.response) {
      return { ...err.response.data, message: err.message, statusCode: err.response.status }
    } else {
      return { message: 'Something went wrong!', statusCode: 500 }
    }
  }
}

export default Request
