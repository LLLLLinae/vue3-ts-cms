import GFLRequest from './request'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

export default new GFLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    interceptorRequestSucc: (conf) => {
      // 携带token的拦截
      const token = 'c'
      // if (token) {
      //   conf.headers.Authorization = `Bearer ${token}`
      // }
      // console.log('单个实例-请求成功的拦截')
      return conf
    },
    interceptorRequestFail: (err) => {
      // console.log('单个实例-请求失败的拦截')
      console.log(err)
    },
    interceptorResponseSucc: (res) => {
      // console.log('单个实例-响应成功的拦截')
      return res
    },
    interceptorResponseFail: (err) => {
      // console.log('单个实例-响应失败的拦截')
      console.log(err)
    }
  }
})
