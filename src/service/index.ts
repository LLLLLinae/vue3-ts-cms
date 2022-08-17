import GFLRequest from './request/index'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

export default new GFLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    interceptorRequestSucc: (conf) => {
      console.log('单个实例-请求成功的拦截')
      return conf
    },
    interceptorRequestFail: (err) => {
      console.log('单个实例-请求失败的拦截')
      console.log(err)
    },
    interceptorResponseSucc: (res) => {
      console.log('单个实例-响应成功的拦截')
      return res
    },
    interceptorResponseFail: (err) => {
      console.log('单个实例-响应失败的拦截')
      console.log(err)
    }
  }
})
