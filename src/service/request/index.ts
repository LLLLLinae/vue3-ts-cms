import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class gflRequest {
  instance: AxiosInstance

  constructor(conf: AxiosRequestConfig) {
    this.instance = axios.create(conf)
  }

  get(params: AxiosRequestConfig) {
    this.instance.request(params)
  }
}

export default gflRequest
