
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
      if(err.response) {
        return {...err.response.data, statusCode: err.response.status}
      } else {
        return {message: 'Something went wrong!', statusCode: 500}
      }
    })
}

export default Request