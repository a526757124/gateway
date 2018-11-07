import axios from '@/libs/api.request'

export const getList = (data) => {
  return axios.request({
    url: '/APIGroup/GetList',
    data: data,
    method: 'post'
  })
}

export const getTop10ByKey1 = (data) => {
  return axios.request({
    url: '/APIGroup/GetTop10ByKey',
    params: {
      ID: 12345
    },
    method: 'get'
  })
}

export const getTop10ByKey = (data) => {
  return axios.request({
    url: '/APIGroup/GetTop10ByKey',
    data: data,
    method: 'post'
  })
}

export const add = (data) => {
  return axios.request({
    url: '/APIGroup/Add',
    data: data,
    method: 'post'
  })
}

export const update = (data) => {
  return axios.request({
    url: '/APIGroup/Update',
    data: data,
    method: 'post'
  })
}

export const del = (data) => {
  return axios.request({
    url: '/APIGroup/Delete',
    data: data,
    method: 'post'
  })
}
