// src/store/locale.js
import { defineStore } from 'pinia';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'zh',
    elementLocale: zhCn,
  }),
  actions: {
    setLocale(lang) {
      this.locale = lang;
      this.elementLocale = lang === 'zh' ? zhCn : en;
    },
  },
});
