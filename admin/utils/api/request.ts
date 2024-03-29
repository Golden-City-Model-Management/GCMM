
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
  let access_token = globalThis.localStorage?.getItem('access_token')
  return myAxios({
    method,
    url: path,
    data,
    headers: {
      ...headers,
      ...( !definedCredentials ? {
        'Authorization': `Bearer ${access_token}`,
      } : {})
    },
    baseURL: baseURL ? baseURL : process.env.NEXT_PUBLIC_SERVER_URL || '',
  })
    .then(response => {
      return { ...response.data, statusCode: response.status }
    })
    .catch(err => {
      console.error(err)
      if (err.response) {
        return { ...err.response.data, statusCode: err.response.status }
      } else {
        return { message: 'Something went wrong!', statusCode: 500 }
      }
    })
}

export default Request