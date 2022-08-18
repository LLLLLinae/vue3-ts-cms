import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './service/axios-demo'
import service from './service'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
service
  .request<DataType>({
    url: '/home/multidata',
    method: 'get',
    showLoading: true,
    interceptors: {
      interceptorRequestSucc: (conf) => {
        console.log('单个请求-请求成功的拦截')
        return conf
      },
      interceptorRequestFail: (err) => {
        console.log('单个请求-请求失败的拦截')
        console.log(err)
      },
      interceptorResponseSucc: (res) => {
        console.log('单个请求-响应成功的拦截')
        return res
      },
      interceptorResponseFail: (err) => {
        console.log('单个请求-响应失败的拦截')
        console.log(err)
      }
    }
  })
  .then((res) => {
    console.log(res)
  })
