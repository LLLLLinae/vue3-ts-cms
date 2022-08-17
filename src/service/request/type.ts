import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface GFLRequestInterceptors<T = AxiosResponse> {
  interceptorRequestSucc?(conf: AxiosRequestConfig): AxiosRequestConfig
  interceptorRequestFail?(conf: any): any
  interceptorResponseSucc?(conf: T): T
  interceptorResponseFail?(conf: any): any
}

export interface GFLRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: GFLRequestInterceptors<T>
}
