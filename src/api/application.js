import axios from '@/libs/api.request'

export const applicationList = () => {
  return axios.request({
    url: 'application',
    method: 'get'
  })
}
