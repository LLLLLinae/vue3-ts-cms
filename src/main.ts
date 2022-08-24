import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'

// import './service/axios-demo'
import service from './service'

//每次刷新页面，都执行一次store中的从localStorage中加载数据的方法
setupStore()

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
