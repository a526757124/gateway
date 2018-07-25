import { applicationList } from '@/api/application'

export default {
  state: {
  },
  mutations: {

  },
  actions: {
    getApplicationList () {
      return new Promise((resolve, reject) => {
        applicationList().then(res => {
          const data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
