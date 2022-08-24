import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import router from '@/router'

import { IAccount, ILoginResult } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
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
    },
    setMenus(state, payload) {
      state.userMenus = payload
    }
  },
  actions: {
    // 1.用户登录
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)

      const { id, token } = loginResult.data
      // token保存到vuex中
      commit('setToken', token)
      // 保存到localStorage中，避免页面刷新时，VUEX中的数据丢失
      localCache.setCache('token', token)

      // 2. 获取用户信息
      const userInfo = await requestUserInfoById(id)
      commit('setUserInfo', userInfo.data)
      localCache.setCache('userInfo', userInfo.data)

      // 3.请求菜单
      const menu = await requestUserMenusByRoleId(userInfo.data.role.id)
      commit('setMenus', menu.data)
      localCache.setCache('menu', menu.data)

      // 4.跳转到首页
      router.push({ name: 'main' })
    },

    // 从localStorage中读取数据赋值给store
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('setUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('setMenus', userMenus)
      }
    }
  }
}

export default LoginModule
