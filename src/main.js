import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from '@/router'
import { createPinia } from 'pinia'

import '@/styles/index.scss'
import { useThemeStore } from '@/stores/theme'

const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

// 初始化主题
const themeStore = useThemeStore()
themeStore.loadFromLocalStorage()

app.mount('#app')
