import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = []

const router = createRouter({
  // 使用的是哈希模式
  history: createWebHashHistory(),
  routes
})

export default router
