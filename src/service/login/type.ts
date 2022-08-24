// 账号密码登录
export interface IAccount {
  name: string
  password: string
}

// 获取用户详情
export interface ILoginResult {
  id: number
  name: string
  token: string
}

// 接口返回值类型
export interface IDataType<T = any> {
  code: number
  data: T
}
