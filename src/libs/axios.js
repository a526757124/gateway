import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import { Message } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      //   config.headers.Authorization = `token ${store.state.token}`;
      // }
      var token = Cookies.get(TOKEN_KEY)
      if (token) {
        config.headers.Authorization = `token ${token}`
      }
      this.queue[url] = true
      return config
    }, error => {
      Message.error('服务内部错误！')
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // const { data, status } = res
      // return { data, status }
      return res.data
    }, error => {
      if (!error.response && error.message === 'Network Error') {
        Message.error('网络异常，请稍后重试！')
      } else {
        Message.error('服务内部错误！')
      }
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
