<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <el-icon class="login-icon">
          <User />
        </el-icon>
        <div class="login-title">
          <h2>欢迎登录</h2>
          <p>请输入您的用户名和密码</p>
        </div>
      </div>
      <el-form
        :model="form"
        ref="loginForm"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-container">
            <el-button type="primary" @click="onSubmit" class="submit-button"
              >提交</el-button
            >
            <el-button @click="onReset" class="reset-button">重置</el-button>
          </div>
        </el-form-item>
        <div class="signup-link">
          <a href="#" @click.prevent="$emit('toggleForm')"
            >没有账号？点击注册</a
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { User } from "@element-plus/icons-vue"; // 导入用户图标
import { useUserStore } from "../../stores/userStore";
import { AuthService } from "../../api/auth";
import { useRouter } from "vue-router";

const form = ref({
  username: "",
  password: "",
});
const loginForm = ref(null);
const userStore = useUserStore();
const router = useRouter();
const onSubmit = async () => {
  if (!form.value.username || !form.value.password) {
    ElMessage.error("用户名和密码不能为空");
    return false;
  } else {
    try {
      const response = await AuthService.login(form.value.username, form.value.password)
      // 登录成功后，将 token 和用户信息存储到 Pinia 中
      if(response.data.data){
        console.log(response.data);
        userStore.login(response.data.data, { username: form.value.username});
      }
      else{
        ElMessage.error("用户名或密码错误");
        return false;
      }
      // 跳转到主页
      router.push({ name: 'Home' })
    } catch (error) {
      // 处理登录失败后的逻辑
      ElMessage.error("登录失败,请检查服务器连接");
    }
  }
};
const onReset = () => {
  loginForm.value.resetFields();
};
</script>
  
  <style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e6f7ff; /* 设置一个浅灰色背景 */
  flex-direction: column; /* 垂直居中 */
}

.login-form {
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

.login-content {
  width: 400px; /* 设置内容的固定宽度，与表单一致 */
  background-color: #ffffff; /* 设置与表单一致的背景色 */
  border-radius: 10px; /* 给内容容器加上圆角，视觉效果一致 */
  overflow: hidden; /* 防止内容溢出 */
}

.login-header {
  background-color: #aacef1; /* 标题区域的背景颜色 */
  color: #070606; /* 标题和描述的文字颜色 */
  text-align: center;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 20px; /* 内边距让内容更舒适 */
  padding-left: 70px;
  gap: 20px;
}

.login-icon {
  font-size: 36px; /* 图标大小 */
  margin-right: 15px; /* 图标和标题之间的距离 */
}

.login-title h2 {
  font-size: 24px;
  margin: 0;
}

.login-title p {
  font-size: 14px;
  margin: 5px 0 0 0; /* 去除默认外边距，并调整为与标题的距离 */
  color: rgb(179, 124, 170);
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
  