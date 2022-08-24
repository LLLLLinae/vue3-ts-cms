import service from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/api/login',
  LoginUserInfo = '/api/users/', // 用法: /users/1
  UserMenus = '/api/role/' // 用法: role/1/menu
}

// 用户账号密码登录
export function accountLoginRequest(account: IAccount) {
  return service.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 获取用户详情
export function requestUserInfoById(id: number) {
  return service.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return service.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
