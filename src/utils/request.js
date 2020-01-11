import Axios from 'axios'

export const Get = (url, data = {}, { loading = true } = {}) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: data
    }).then(res => {
      return resolve(res.data)
    }).catch(res => {
      console.log('....')
		})
  })
}

export const Post = (url, data = {}, { loading = true } = {}) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data , {
      timeout: 30000
    }).then(res => {
      return resolve(res.data)
    }).catch(res => {
      console.log('.....')
    })
  })
}
