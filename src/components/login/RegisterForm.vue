<template>
    <div class="register-container">
    <div class="register-content">
    <div class="register-header">
        <el-icon class="register-icon">
            <EditPen />
        </el-icon>
        <div class="register-title">
          <h2>欢迎注册</h2>
          <p>请输入以下信息,均为必填项</p>
        </div>
    </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="registerForm"
        label-width="80px"
        class="register-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-container">
            <el-button type="primary" @click="onSubmit" class="submit-button">提交</el-button>
            <el-button @click="onReset" class="reset-button">重置</el-button>
          </div>
        </el-form-item>
        <div class="signup-link">
        <a href="#" @click.prevent="$emit('toggleForm')">已有账号？返回登录</a> 
      </div>
      </el-form>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance} from 'vue'
  import { ElMessage } from 'element-plus'
  import { EditPen} from '@element-plus/icons-vue' // 导入用户图标

  const {proxy} = getCurrentInstance()
  const form = ref({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  })
  const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' } // 自动检查邮箱格式
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value) => value === form.value.password, message: '两次输入的密码不一致', trigger: 'blur' }
  ]
}
  const emit = defineEmits(['toggleForm'])
  const registerForm = ref(null)
  const onSubmit = () => {
    registerForm.value.validate((valid) => {
    if (valid) {
       ElMessage.success('注册成功！')
    //   if (valid) {
    //   const submitData = { ...form.value } // 复制表单数据
    //   delete submitData.confirmPassword // 删除确认密码字段
    //   console.log('提交的数据:', submitData)
    //   // 这里执行向后端发送请求的逻辑
    //   // axios.post('/api/register', submitData).then(response => { ... })
    // }
       emit('toggleForm')
    }
    else{
        ElMessage.error('注册失败！')
    }
  })
}
  const onReset = () => {
    registerForm.value.resetFields()
  }
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #E6F7FF; /* 设置一个浅灰色背景 */
    flex-direction: column; /* 垂直居中 */
  }
  
  .register-form {
    width: 400px; /* 更宽的表单以显得大气 */
    padding: 20px; /* 增加内边距 */
    background-color: rgb(244, 246, 248);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); /* 更明显的阴影 */
    border-radius: 10px; /* 更大的圆角 */
  }
  
  .button-container {
    display: flex;
    justify-content: space-around; /* 按钮左右均匀分布 */
    gap: 50px; /* 按钮之间的间距 */
    margin-top: 10px; /* 增加按钮与输入框的间距 */
  }
  
  .submit-button {
    width: 45%; /* 调整按钮宽度以增加间距 */
    margin-left: 20px;
  }
  
  .reset-button {
    width: 45%; /* 调整按钮宽度以增加间距 */
    
  }
  
  .el-input {
    width: 80%; /* 输入框占据全宽 */
  }
  
  .el-form-item {
    margin-bottom: 20px; /* 增加表单项的间距 */
  }

  .register-content {
  width: 400px; /* 设置内容的固定宽度，与表单一致 */
  background-color: #FFFFFF; /* 设置与表单一致的背景色 */
  border-radius: 10px; /* 给内容容器加上圆角，视觉效果一致 */
  overflow: hidden; /* 防止内容溢出 */
}

.register-header {
  background-color: #aacef1; /* 标题区域的背景颜色 */
  color: #070606; /* 标题和描述的文字颜色 */
  text-align: center;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 20px; /* 内边距让内容更舒适 */
  padding-left: 70px;
  gap:20px
}

.register-icon {
  font-size: 36px; /* 图标大小 */
  margin-right: 15px; /* 图标和标题之间的距离 */
}

.register-title h2 {
  font-size: 24px;
  margin: 0;
}

.register-title p {
  font-size: 14px;
  margin: 5px 0 0 0; /* 去除默认外边距，并调整为与标题的距离 */
  color:rgb(179, 124, 170)
}
.signup-link {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #666666;
}

.signup-link a {
  color: #8dc1f6;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
  margin-right: 40px;
}

.signup-link a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
  