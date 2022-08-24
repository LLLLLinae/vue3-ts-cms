import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

// 执行各个模块自己定义的加载数据的操作
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
