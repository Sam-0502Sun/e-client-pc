// 创建一个新的axios实例
// 请求拦截器，如果有token进行头部携带
// 响应拦截器， 剥离无效数据， 处理token失效
// 倒出一个函数，调用当前axios实例发请求， 返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因是有些地方不是通过axios发送请求的，也需要基准地址，例如上传图片
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
//  axios的一些配置, baseURL, timeout
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
//  拦截的业务逻辑
//  进行请求配置的修改
//  如果本地有token就在头部携带
//  获取用户信息对象
  const profile = store.state.user.profile
  // 判断是否有token
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  // 错误的时候返回错误对象，把err传进去
  return Promise.reject(err)
})

// 响应拦截器
// res => res.data 取出data数据，将来调用接口的时候直接拿到的就是可用的后台数据（剥离无效层和数据）
instance.interceptors.response.use(res => res.data, err => {
  // 401状态码，进入该函数
  // 判断，当err.response存在，并且err.response.status === 401
  if (err.response && err.response.status === 401) {
    //  清空本地无效用户信息
    //  跳转到登陆页面
    //  跳转需要传参（当前路由地址）给登陆页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // '组件里' 取完整路由地址：`/user?a=10`     $route.path === /user     $router.fullPath === /user?a=10
    // 'js模块' 中：router.currentRoute.value.fullPath 就是当前路由地址 router.currentRoute 是ref响应式数据,所以需要加上.value
    // encodeURIComponent转换URI编码，浏览器可以识别
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
//  负责发请求， 请求地址，请求方式，提交数据
//  直接返回promise，这样以后可以直接使用async await
  return instance({
    url,
    method,
    //  如果是get请求   需要使用params来传递submitData
    //  如果不是get请求  需要使用data来传递submitData
    //  const a = {name:100}  a.name  a['name']  是一样的，[]里面还可以写js表达式，也可以写变量 a[10>9?'name': 'age']
    //  []设置一个状态的key, 写js表达式，js执行结果当作key
    // method参数： get，Get, GET 转换成小写再来判断  .toLowerCase()
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
