import axiosInstance from '../utils/axiosInstance'


export const AuthService = {
    async login(username, password) {
        try {
            const response = await axiosInstance.post('/login', { username, password })
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
