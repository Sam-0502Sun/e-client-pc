import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/home/index'

// 路由规则
const routes = [
//  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home }
    ]
  }
]

const router = createRouter({
  // 使用的是哈希模式
  history: createWebHashHistory(),
  routes
})

export default router
