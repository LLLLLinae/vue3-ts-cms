import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 接口内部的函数有不确定的类型时，需要接口通过泛形接受类型参数
export interface GFLRequestInterceptors<T = AxiosResponse> {
  interceptorRequestSucc?(conf: AxiosRequestConfig): AxiosRequestConfig
  interceptorRequestFail?(conf: any): any
  // 参数的类型可能是AxiosResponse类型，也可能是其他请求定义的泛形
  // 所以不指定具体的类型，通过接口传递的泛形指定
  interceptorResponseSucc?(conf: T): T
  interceptorResponseFail?(conf: any): any
}

export interface GFLRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: GFLRequestInterceptors<T>
}
