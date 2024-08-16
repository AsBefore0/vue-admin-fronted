<template>
    <div class="custom-header">
      <div class="spacer"></div> <!-- 占位符，用于将标题居中 -->
      <div class="title">信息管理系统</div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar size="default" :src="userAvatar"></el-avatar>
            <span class="username">{{ username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="profile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '../../stores/userStore';
  import { useRouter } from 'vue-router'
  const username = ref('')
  const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
  const userStore = useUserStore()
  const router = useRouter()

  const profile = () => {
    console.log('进入个人中心')
  }
  
  const logout = () => {
    userStore.logout()
    router.push({name: 'Login'})
  }
  onMounted(() => {
    username.value = userStore.userInfo.username
  })
  </script>
  
  <style scoped>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #b0d4f9;
    color: white;
    position: relative;
  }
  
  .spacer {
    flex: 1;
  }
  
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    font-weight: bold;
    color: black;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
  }
  .username {
    margin-left: 8px;
    font-size: 20px;
    font-weight: 600;
  }
  
  .el-avatar {
    margin-right: 8px;
  }
  </style>
  