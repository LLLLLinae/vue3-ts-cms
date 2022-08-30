import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'

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
    login,
    system
  }
})

// 执行各个模块自己定义的加载数据的操作
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 官方提供的useState()方法的返回的类型是rootState,不包含模块state中的数据
// 使用这个方法使其返回值的类型包括rootState和所有模块state
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
