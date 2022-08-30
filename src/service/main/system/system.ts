import gflRequest from '../../index'

import { IDataType } from '../../types'

// 获取用户列表数据
export function getUserListData(queryInfo: any) {
  return gflRequest.post<IDataType>({
    url: '/api/users/list',
    data: queryInfo
  })
}
