import service from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  LoginAPI = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return service.post({ url: LoginAPI.LoginAPI, data: account })
}
