import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

export const getApiInfoList = req => {
  let ajaxData = []
  req = JSON.parse(req.body)
  doCustomTimes(58, () => {
    ajaxData.push(Mock.mock({
      ApiID: '@guid',
      ApiName: '@title',
      ApiDesc: '@csentence(20,50)',
      ApiModule: '@csentence(2,5)',
      ApiUrl: '@url',
      TargetApiUrl: '@url',
      AppIPList: '@ip',
      'ApiType|0-2': 0,
      'HttpMethode|1-2': 0,
      'Status|0-2': 0
    }))
  })
  var _start = (req.pageIndex - 1) * req.pageSize
  var _end = req.pageIndex * req.pageSize
  var tableData = ajaxData.slice(_start, _end)
  return {
    code: 200,
    data: tableData,
    msg: ''
  }
}
