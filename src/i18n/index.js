// src/i18n/index.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json'; // 导入英文翻译文件
import zh from './locales/zh.json'; // 导入中文翻译文件
import enElement from 'element-plus/es/locale/lang/en';
import zhElement from 'element-plus/es/locale/lang/zh-cn';

const messages = {
  en: {
    ...en, // 应用的英文翻译
    ...enElement, // Element Plus 英文语言包
  },
  zh: {
    ...zh, // 应用的中文翻译
    ...zhElement, // Element Plus 中文语言包
  },
};

const i18n = createI18n({
  locale: 'zh', // 默认语言为中文
  fallbackLocale: 'en', // 备用语言为英文
  messages,
});

export default i18n;