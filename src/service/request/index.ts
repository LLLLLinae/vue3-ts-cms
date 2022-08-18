import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { GFLRequestInterceptors, GFLRequestConfig } from './type'

import { ElLoading } from 'element-plus'

const DEAFULT_LOADING = true

class GFLRequest {
  instance: AxiosInstance
  interceptors?: GFLRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(conf: GFLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(conf)

    // 保存基本信息
    this.interceptors = conf.interceptors
    this.showLoading = conf.showLoading ?? DEAFULT_LOADING

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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
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

        // 将loading移除
        this.loading?.close()
        this.showLoading = DEAFULT_LOADING
        // 取出接口真实返回的数据
        return res.data
      },
      (err: any) => {
        console.log('所有实例-响应失败的拦截')
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }

  // promise可以设置泛型，规定resolve(res)中res的类型

  // 这里request设置一个泛型，调用者可以传入一个类型参数
  // T-》GFLRequestConfig-》interceptorResponseSucc参数为T
  // T->this.instance.request<any, T>->res类型为T
  request<T>(conf: GFLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.对单个请求进行拦截
      // 在发送实际请求之前
      // 执行一遍单个请求中传入的请求拦截函数(通常请求拦截只执行成功的)
      if (conf.interceptors?.interceptorRequestSucc) {
        conf = conf.interceptors?.interceptorRequestSucc(conf)
      }

      // 判断是否传入showLoading
      if (conf.showLoading === false) {
        this.showLoading = false
      }
      // 调用axios实例的request方法去发送实际的请求
      this.instance
        // axios实例的request方法有两个泛型，第二个泛型决定then回调函数中的参数的类型
        .request<any, T>(conf)
        .then((res) => {
          // 当真实请求成功时，执行一下该单个请求中传入的响应拦截请求
          // 这里请求到的数据已经经过响应拦截器的拦截，数据的类型不是AxiosResponse
          if (conf.interceptors?.interceptorResponseSucc) {
            // 进行泛型的类型约束，实际使用的res和类型定义时的类中一致
            res = conf.interceptors.interceptorResponseSucc(res)
          }

          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
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

// 注意：
// 先定义的拦截器先后执行，想要更改拦截器间的执行顺序，可以修改拦截器的定义顺序
