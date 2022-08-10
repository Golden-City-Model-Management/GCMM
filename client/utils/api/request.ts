
import axios from 'axios'

interface RequestInterface {
  baseURL?: string,
  path: string,
  method: string,
  data?: object,
}

let myAxios = axios.create({
  baseURL: 'http://localhost:9876/api/v1/',
  headers: {
    client_secret: process.env.CLIENT_SECRET || '' ,        
  }
})

async function Request ({
  baseURL,
  path,
  method = 'GET',
  data = {},
}: RequestInterface) {

  if(baseURL) myAxios.defaults.baseURL = baseURL
  return  myAxios({
      method,
      url: path,
      data,
    })
    .then(response => ({...response.data, statusCode: response.status}))
    .catch(err => {
      return {statusCode: err.response.status, ...err.response.data}
    })
}

export default Request