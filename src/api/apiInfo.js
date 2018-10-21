import axios from '@/libs/api.request'

export const getApiInfoList = ({pageIndex, pageSize}) => {
  return axios.request({
    url: 'get_apiinfo_list',
    data: {
      pageIndex,
      pageSize
    },
    method: 'post'
  })
}
