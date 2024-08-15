import axiosInstance from '../utils/axiosInstance'

export const AuthService = {
  async login(email, password) {
    try {
      const response = await axiosInstance.post('/login', { email, password })
      return response
    } catch (error) {
      console.error('登录请求失败:', error)
      throw error
    }
  },

  async logout() {
    try {
      const response = await axiosInstance.post('/logout')
      return response
    } catch (error) {
      console.error('登出请求失败:', error)
      throw error
    }
  }
}
