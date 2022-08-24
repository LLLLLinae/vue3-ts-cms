import GFLRequest from './request'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

import localCache from '@/utils/cache'

export default new GFLRequest({
  // baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    interceptorRequestSucc: (config) => {
      // console.log('单个实例-请求成功的拦截')
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        //对header进行非空断言
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    interceptorRequestFail: (err) => {
      // console.log('单个实例-请求失败的拦截')
      // console.log(err)
    },
    interceptorResponseSucc: (res) => {
      // console.log('单个实例-响应成功的拦截')
      return res
    },
    interceptorResponseFail: (err) => {
      // console.log('单个实例-响应失败的拦截')
      // console.log(err)
    }
  }
})
