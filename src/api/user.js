import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    LoginName: userName,
    LoginPwd: password
  }
  return axios.request({
    url: '/User/Login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  const data = {
    Token: token
  }
  return axios.request({
    url: '/User/GetLoginInfo',
    data,
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/User/LoginOut',
    data: {
      token
    },
    method: 'post'
  })
}

export const getList = (data) => {
  return axios.request({
    url: '/User/GetList',
    data: data,
    method: 'post'
  })
}

export const add = (data) => {
  return axios.request({
    url: '/User/Add',
    data: data,
    method: 'post'
  })
}

export const update = (data) => {
  return axios.request({
    url: '/User/Update',
    data: data,
    method: 'post'
  })
}

export const del = (data) => {
  return axios.request({
    url: '/User/Delete',
    data: data,
    method: 'post'
  })
}
