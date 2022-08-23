import { Module } from 'vuex'
import { accountLoginRequest } from '@/service/login/login'

import localCache from '@/utils/cache'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const LoginModule: Module<ILoginState, IRootState> = {
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    //1.用户登录
    async accountLoginAction({ commit }, payload: IAccount) {
      const userInfo = await accountLoginRequest(payload)
      commit('setUserInfo', userInfo)
      // 保存到localStorage中，避免页面刷新时，VUEX中的数据丢失
      localCache.setCache('userInfo', userInfo)
    }
    //2. 获取用户信息
  }
}

export default LoginModule
