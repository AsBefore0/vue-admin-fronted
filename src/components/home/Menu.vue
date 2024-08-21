<template>
  <div class="menu">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :active-text-color="isDark ? '#bb86fc' : '#a88bf0'"
          :background-color="isDark ? '#2c2c2c' : '#ceeef8'"
          class="el-menu-vertical-demo"
          default-active="1"
          :text-color="isDark ? '#fff' : '#000'"
        >
          <el-menu-item index="1" @click="navigateTo('/dashboard')">
            <el-icon><icon-menu /></el-icon>
            <span class="title">首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span class="title">管理</span>
            </template>
            <el-menu-item index="2-1" @click="navigateTo('/user')"
              >用户管理</el-menu-item
            >
            <el-menu-item index="2-2" @click="navigateTo('/role')"
              >角色管理</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";
const isDark = useDark();
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.menu {
  background-color: #ceeef8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  width: 180px;
  height: 100vh;
}
.el-menu-vertical-demo {
  width: 180px;
}

.el-menu-item .el-icon,
.el-sub-menu__title .el-icon {
  margin-right: 8px; /* 图标与文字间的距离 */
}
.el-menu-item {
  font-size: 16px;
}
.title {
  font-size: 18px;
}
.dark .menu {
  background-color: #2c2c2c;
  color: #fff;
}
</style>
