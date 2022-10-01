
import axios, { AxiosRequestHeaders } from 'axios'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
  headers?: AxiosRequestHeaders,
  withCredentials?: boolean
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
  withCredentials
}: RequestInterface) => {

  const definedCredentials = typeof withCredentials === 'boolean'

  return myAxios({
    method,
    url: path,
    data,
    headers: {
      ...headers,
      ...( !definedCredentials ? {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || '',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': ' Content-Type, Authorization'
      } : {})
    },
    baseURL: baseURL ? baseURL : process.env.NEXT_PUBLIC_SERVER_URL || '',
    withCredentials: definedCredentials ? withCredentials : true

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