
import axios, { AxiosRequestHeaders } from 'axios'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
  headers?: AxiosRequestHeaders
} 
let myAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    client_secret: process.env.CLIENT_SECRET || '' ,        
  }
})

const Request = async ({
  baseURL,
  path,
  method = 'GET',
  data = {},
  headers = {}
}: RequestInterface) => {

  if(baseURL) myAxios.defaults.baseURL = baseURL
  return  myAxios({
      method,
      url: path,
      data,
      headers
    })
    .then(response => ({...response.data, statusCode: response.status}))
    .catch(err => {
      if(err.response) {
        return {...err.response.data, statusCode: err.response.status}
      } else {
        return {message: 'Something went wrong!', statusCode: 500}
      }
    })
}

export default Request