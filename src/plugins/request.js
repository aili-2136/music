import axios from 'axios'
import { Message } from 'element-ui'

const request=axios.create({
	baseURL:'http://39.106.23.37:3000/',
	withCredentials:true,
	timeout:30000
})


// 请求拦截
request.interceptors.request.use(config=>{
	return config
} 
)
/* 响应拦截 */
request.interceptors.response.use(
  res => {
   /*可在这里根据返回的状态码做一些拦截操作*/  
    return res
  }, err => {
	  const {code,message}=err
      return Promise.resolve(err)
  }
)


export default request

