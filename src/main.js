// main.ts
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-persistedstate-plugin";
import Cookies from "js-cookie";

const persistPlugin = createPersistedState()
const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$cookies = Cookies;
pinia.use(persistPlugin)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')