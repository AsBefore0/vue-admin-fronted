// src/utils/axiosInstance.js
import axios from 'axios'
import { useUserStore } from '../stores/userStore'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080', // 替换为你的API基础URL
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
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
    // 对响应数据做点什么
    return response
  },
  error => {
    // 对响应错误做点什么，比如处理401或500错误
    if (error.response && error.response.status === 401) {
      // 处理未授权的情况
      const userStore = useUserStore()
      userStore.logout() // 清除 Pinia 中的 token 和用户信息
      console.error('Unauthorized, redirecting to login...')

      // 你可以选择使用 router 进行重定向，而不是 window.location
      router.push({ name: 'Login' })
    } else if (error.response && error.response.status === 500) {
      console.error('Server error, please try again later.')
      // 处理 500 错误，显示提示信息或者其他操作
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
