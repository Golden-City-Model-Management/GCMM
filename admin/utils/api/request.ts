
import axios, { AxiosRequestHeaders } from 'axios'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
  headers?: AxiosRequestHeaders,
  access_token?: string
}
let myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

const Request = async ({
  baseURL,
  path,
  method = 'GET',
  data = {},
  headers = {},
  access_token
}: RequestInterface) => {

  if (baseURL) myAxios.defaults.baseURL = baseURL
  myAxios.defaults.withCredentials = true

  return myAxios({
    method,
    url: path,
    data,
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || '',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': ' Content-Type, Authorization'
    },
  })
    .then(response => {
      return { ...response.data, statusCode: response.status }
    })
    .catch(err => {
      console.log(err)
      if (err.response) {
        return { ...err.response.data, statusCode: err.response.status }
      } else {
        return { message: 'Something went wrong!', statusCode: 500 }
      }
    })
}

export default Request