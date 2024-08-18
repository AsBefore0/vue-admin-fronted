import axios from 'axios'
import { ElMessage } from 'element-plus' // 导入 ElMessage
import { useUserStore } from '../stores/userStore'
import router from '../router' // 导入路由实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 替换为你的API基础URL
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // 跨域请求携带凭证
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      if (response.data.msg === "NOT_LOGIN") {
        // 处理未登录的情况
        ElMessage.error('登录已过期,请重新登录')
        const userStore = useUserStore()
        userStore.logout() // 清除 Pinia 中的 token 和用户信息
        router.push({ name: 'Login' })
      }else{
        throw new Error()
      }
    }
    return response
  },
  error => {
    // 对响应错误做点什么，比如处理401或500错误
    if (error.response && error.response.status === 401) {
      // 处理未授权的情况
      const userStore = useUserStore()
      userStore.logout() // 清除 Pinia 中的 token 和用户信息
      // 使用 router 进行重定向
      router.push({ name: 'Login' })
    } else if (error.response && error.response.status === 500) {
      console.error('Server error, please try again later.')
    }
    // return Promise.reject(error)
    console.error(error)
  }
)

export default axiosInstance
