import axios from 'axios'

const API_URL = '/api/users'

// 获取用户列表
// 获取用户列表，支持分页和查找
export const fetchUsers = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('获取用户数据失败', error);
    throw error;
  }
};

// 添加新用户
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData)
    return response.data
  } catch (error) {
    console.error('添加用户失败', error)
    throw error
  }
}

// 编辑用户
export const updateUser = async (id, userData) => {
  try {
    await axios.put(`${API_URL}/${id}`, userData)
  } catch (error) {
    console.error('编辑用户失败', error)
    throw error
  }
}

// 删除用户
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('删除用户失败', error)
    throw error
  }
}
