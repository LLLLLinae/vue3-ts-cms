import gflRequest from './request/index'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

export default new gflRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
