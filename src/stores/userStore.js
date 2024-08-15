// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,   // 存储用户信息
    token: null,      // 存储token
    isAuthenticated: false, // 是否已登录
  }),
  actions: {
    login(userData, token) {
      this.userInfo = userData
      this.token = token
      this.isAuthenticated = true
    },
    logout() {
      this.userInfo = null
      this.token = null
      this.isAuthenticated = false
    },
  },
})
