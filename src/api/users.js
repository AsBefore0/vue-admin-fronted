import axiosInstance from '../utils/axiosInstance'

const API_URL = '/users'

export const UserService = {
    async fetchUsers(params) {
        try {
            const response = await axiosInstance.get(API_URL, { params })
            return response.data
        } catch (error) {
            console.error('获取用户数据失败', error)
            throw error
        }
    },
    async createUser(userData) {
        try {
            const response = await axiosInstance.post(API_URL, userData)
            return response.data
        } catch (error) {
            console.error('添加用户失败', error)
            throw error
        }
    },
    async updateUser(id, userData) {
        try {
            await axiosInstance.put(`${API_URL}/${id}`, userData)
        } catch (error) {
            console.error('编辑用户失败', error)
            throw error
        }
    },
    async deleteUser(id) {
        try {
            await axiosInstance.delete(`${API_URL}/${id}`)
        } catch (error) {
            console.error('删除用户失败', error)
            throw error
        }
    }
}
