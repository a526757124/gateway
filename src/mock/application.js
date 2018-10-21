import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

export const getList = req => {
  let ajaxData = []
  req = JSON.parse(req.body)
  doCustomTimes(58, () => {
    ajaxData.push(Mock.mock({
      AppID: '@guid',
      AppName: '@title',
      AppDesc: '@csentence(20,50)',
      AppKey: '@string',
      AppUrl: '@url',
      AppIPList: '@ip',
      DevUser: '@cname',
      ProductUser: '@cname',
      CreateDate: '@now',
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
