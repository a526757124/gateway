import axios from '@/libs/api.request'

export const getList = (data) => {
  return axios.request({
    url: '/App/GetList',
    data: data,
    method: 'post'
  })
}

export const add = (data) => {
  return axios.request({
    url: '/App/Add',
    data: data,
    method: 'post'
  })
}

export const update = (data) => {
  return axios.request({
    url: '/App/Update',
    data: data,
    method: 'post'
  })
}

export const del = (data) => {
  return axios.request({
    url: '/App/Delete',
    data: data,
    method: 'post'
  })
}
