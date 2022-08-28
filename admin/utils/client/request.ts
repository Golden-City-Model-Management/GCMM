
import axios from 'axios'
import setUpInterceptors from './interceptors'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method?: string,
  data?: object,
}

let myAxios = axios.create({
  baseURL: '/admin/api',
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
    return response

  }catch(err: any){
    return err.response 
  }
}

export default Request
