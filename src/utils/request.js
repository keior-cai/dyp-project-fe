import Axios from 'axios'

import { Message } from 'element-ui'

Axios.defaults.withCredentials=true

export const Get = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params : data
    }).then(res => {
      const data = res.data
      if(data.code == -999) {
        window.location.href = data.data
      }else if (data.code != 0){
				Message.error({
				  message : data.message,
				  showClose: true,
				  duration: 1500,
				})
			} else {
        return resolve(data)
      }
    }).catch(res => {
      Message.error('网络异常')
		})
  })
}

export const Post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data , {
      timeout: 30000
    }).then(res => {
      const data = res.data
      if(data.code == -999) {
        window.location.href = data.data
      }else if (data.code != 0){
      	Message.error({
      	  message : data.message,
      	  showClose: true,
      	  duration: 1500,
      	})
      } else {
        return resolve(data)
      }
    }).catch(res => {
      Message.error('网络异常')
      // console.log(res)
    })
  })
}
