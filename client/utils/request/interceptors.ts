import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";


const setupConfig =  (config: AxiosRequestConfig): AxiosRequestConfig => {
  if(!config.headers){
    config.headers = {}
  }
  console.log(config)
  config.headers.client_secret = true
  console.log(config)
  return config; 
}

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const readResponse = (response: AxiosResponse): AxiosResponse => {

  return response;
}

const handleResponseError = (error: AxiosError): Promise<AxiosError> => {

  return Promise.reject(error);
}

export default function setUpInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(setupConfig, handleRequestError);
  axiosInstance.interceptors.response.use(readResponse, handleResponseError);
  return axiosInstance;
}