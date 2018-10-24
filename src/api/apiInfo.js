import axios from '@/libs/api.request'

export const getAPIInfoById = (data) => {
  return axios.request({
    url: '/APIInfo/GetAPIInfoById',
    data: data,
    method: 'post'
  })
}

export const getList = (data) => {
  return axios.request({
    url: '/APIInfo/GetList',
    data: data,
    method: 'post'
  })
}

export const add = (data) => {
  return axios.request({
    url: '/APIInfo/Add',
    data: data,
    method: 'post'
  })
}

export const update = (data) => {
  return axios.request({
    url: '/APIInfo/Update',
    data: data,
    method: 'post'
  })
}

export const del = (data) => {
  return axios.request({
    url: '/APIInfo/Delete',
    data: data,
    method: 'post'
  })
}
