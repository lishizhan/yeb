import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'


axios.interceptors.request.use(config=>{
  //获取登陆的请求token，判断是否存在，不存在表示未登录
  if (window.sessionStorage.getItem("tokenStr")){
    //请求头设置token
    config.headers['Authorization'] = window.sessionStorage.getItem("tokenStr")
  }
  return config
},error => {
  console.log(error)
})

//响应拦截器 //响应失败弹出消息
axios.interceptors.response.use(success => {
  //进入此方法表示成功调用服务接口
  //判断业务逻辑
  if (success.status && success.status === 200) {
    let code = success.data.code
    if (code === 500 | code === 401 || code === 403) {
      Message.error({ message: success.data.message })
      return
    }
    if (success.data.message) {
      Message.success({ message: success.data.message })
    }
  }
  return success.data
}, error => {
  //接口访问出错
  if (error.response.code === 504 || error.response.code === 404) {
    Message.error({ message: '服务出错，请稍后再试！！' })
  } else if (error.response.code === 403) {
    Message.error({ message: '权限不足，请联系管理员！' })
  } else if (error.response.code === 401) {
    Message.error({ message: '尚未登陆，请登陆！' })
    router.replace('/')
  } else {
    if (error.message) {
      Message.error({ message: error.response.data.message })
    } else {
      Message.error({ message: '未知错误' })
    }
  }
  return
})




let base = ''
// 请求拦截
export const postRequest = (url,params) => {
  return axios({
    method: 'POST',
    url: `${base}${url}`,
    data: params
  })
}

export const getRequest = (url,params) => {
  return axios({
    method: 'GET',
    url: `${base}${url}`,
    data: params
  })
}
export const putRequest = (url,params) => {
  return axios({
    method: 'PUT',
    url: `${base}${url}`,
    data: params
  })
}

export const delRequest = (url,params) => {
  return axios({
    method: 'DELETE',
    url: `${base}${url}`,
    data: params
  })
}




