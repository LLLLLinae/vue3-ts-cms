import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 根state和各模块中state的类型的集合
export type IStoreType = IRootState & IRootWithModule
