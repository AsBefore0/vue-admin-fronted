<template>
  <div class="custom-header">
    <el-button @click="handleChangeDark">
      {{ isDark ? $t("darkMode") : $t("lightMode") }}
    </el-button>
    <!-- 占位符，用于将标题居中 -->
    <el-config-provider :locale="elementLocale">
      <div class="spacer">
        <el-select
          v-model="selectedLanguage"
          @change="switchLanguage"
          placeholder="Select Language"
          style="width: 90px; margin-left: 20px"
        >
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
        </el-select>
      </div>
    </el-config-provider>
    <div class="title">{{ $t("title") }}</div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="default" :src="userAvatar"></el-avatar>
          <span class="username">{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="profile">{{
              $t("dropdown.profile")
            }}</el-dropdown-item>
            <el-dropdown-item @click="logout">{{
              $t("dropdown.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, computed, ref } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { useLocaleStore } from "../../stores/locale";
import { useI18n } from "vue-i18n";
const username = ref("");
const userAvatar = ref(
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
);
const userStore = useUserStore();
const router = useRouter();

const localeStore = useLocaleStore();
const { locale } = useI18n();
const elementLocale = computed(() => localeStore.elementLocale);
const selectedLanguage = ref(localeStore.locale);

// 切换语言函数
const switchLanguage = (lang) => {
  localeStore.setLocale(lang);
  locale.value = lang;
  selectedLanguage.value = lang; // 更新下拉框选项
};

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
const handleChangeDark = () => {
  toggleDarkMode();
};

const profile = () => {
  console.log("进入个人中心");
};

const logout = () => {
  userStore.logout();
  router.push({ name: "Login" });
};
onMounted(() => {
  username.value = userStore.userInfo.username;
});
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
.dark .custom-header {
  background-color: #202126;
  color: #fff;
}
.dark .title {
  color: #fff;
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
  