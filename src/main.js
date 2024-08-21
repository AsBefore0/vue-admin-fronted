import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/style.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
app.use(router);
const pinia = createPinia()
pinia.use(piniaPersistedstate)
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
