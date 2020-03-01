import axios from 'axios'
import qs from 'qs'
const querystring = require('querystring')
//
// // 拦截器
//
// axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.timeout = 5000 // 超时时长
axios.defaults.withCredentials = true // 携带cookie
// // 这样设置无效，需要在拦截器中设置
// axios.defaults.headers.post['Content-Type'] = 'charset=UTF-8'
// axios.defaults.headers.get
//
// http request 封装请求头拦截器
axios.interceptors.request.use(config => {
  // 发送之前做什么
  // eslint-disable-next-line eqeqeq
  if (config.url == '/api/login') {
    // 传送不是json格式
    config.headers = {
      'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  } else {
    // 传送文件需要的请求头
    // eslint-disable-next-line eqeqeq
    if (config.url == '/api/file/updateimgae') {
      config.headers = {
        'content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    } else {
      // Json格式需要的请求头
      config.headers = {
        'content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
  // console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})
// http response 封装后台返回拦截器
axios.interceptors.response.use(response => {
  // 相应数据
  // console.log(response)
  return response
}, error => {
  // if(error.)
  return Promise.reject(error)
})

/*
 *get 请求
 * @param {string} url 请求url
 * @param {Object} data 没有请求参数
 */
export function getornonumber (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data)
    }).catch(err => {
      // eslint-disable-next-line no-undef
      reject(err.data)
    })
  })
}

/*
 *get 请求
 * @param {string} url 请求url
 * @param {Object} data 请求参数
 */
export function get (url, data = {}) {
  // console.log(data)
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data,
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // eslint-disable-next-line no-undef
        reject(err.data)
      })
  })
}

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, querystring.stringify(data), {
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      // eslint-disable-next-line no-undef
      reject(err.data)
    })
  })
  // return axios.post(url, data).then(res => {
  //   console.log(res)
  // }).catch(erro => {
  //   console.log(erro)
  // })
}
export function postJson (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.parse(data)).then(res => {
      resolve(res.data)
    }).catch(err => {
      // eslint-disable-next-line no-undef
      reject(err.data)
    })
  })
}

export function postFile (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      // eslint-disable-next-line no-undef
      reject(err.data)
    })
  })
}

//
// /*
//  *post 请求
//  * @param {string} url 请求url
//  * @param {Object} data 请求参数
//  */
// export function psot (url, data = {}) {
//   return axios.post(url, querystring.stringify(data))
// }
//
// /*
//  * post 请求
//  * @param {string} url 请求url
//  * @param {Object} data 请求参数
//  */
// export function postWithJson (url, data = {}) {
//   return axios.post(url, data)
// }
//
// /**
//  * post form参数请求
//  * @param {string} url 请求 url
//  * @param {Object} data 发送的数据
//  * @return {Promise}
//  */
// export function form (url, data = {}) {
//   return axios.post(url, querystring.stringify(data), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
