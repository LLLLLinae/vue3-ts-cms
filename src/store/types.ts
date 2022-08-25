import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 根state和各模块中state的类型的集合
export type IStoreType = IRootState & IRootWithModule
