import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './service/axios-demo'
import request from './service'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

request
  .get({
    url: '/home/multidata',
    method: 'get'
  })
  .then((res) => {
    console.log(res)
  })
