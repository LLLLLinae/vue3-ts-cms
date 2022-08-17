import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { GFLRequestInterceptors, GFLRequestConfig } from './type'

class GFLRequest {
  instance: AxiosInstance
  interceptors?: GFLRequestInterceptors

  constructor(conf: GFLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(conf)

    // 保存基本信息
    this.interceptors = conf.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是new当前axios实例时传入的
    // 对该实例的所有请求进行拦截
    this.instance.interceptors.request.use(
      this.interceptors?.interceptorRequestSucc,
      this.interceptors?.interceptorRequestFail
    )
    this.instance.interceptors.response.use(
      this.interceptors?.interceptorResponseSucc,
      this.interceptors?.interceptorResponseFail
    )
    // 2. 所有实例都拦截
    this.instance.interceptors.request.use(
      (conf) => {
        console.log('所有实例-请求成功的拦截')
        return conf
      },
      (err: any) => {
        console.log('所有实例-请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例-响应成功的拦截')
        return res.data
        // ??return的数据去哪了
      },
      (err: any) => {
        console.log('所有实例-响应失败的拦截')
        return err
      }
    )
  }
  // 3.对单个请求进行拦截
  request<T>(conf: GFLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 在发送实际请求之前
      // 执行一遍单个请求中传入的请求拦截函数(通常请求拦截只执行成功的)
      if (conf.interceptors?.interceptorRequestSucc) {
        conf = conf.interceptors?.interceptorRequestSucc(conf)
      }
      // 调用axios实例的request方法去发送实际的请求
      this.instance
        .request<any, T>(conf)
        .then((res) => {
          // 当真实请求成功时，执行一下该单个请求中传入的响应拦截请求
          if (conf.interceptors?.interceptorResponseSucc) {
            res = conf.interceptors.interceptorResponseSucc(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(conf: GFLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...conf, method: 'GET' })
  }
}

export default GFLRequest
