import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式库
import 'normalize.css'
// 自己项目的重置样式和公用样式
import '@/assets/styles/common.less'
// 倒入自己的UI组件库
import UI from '@/components/library'

createApp(App)
  .use(store)
  .use(router)
  .use(UI)
  .mount('#app')
