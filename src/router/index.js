import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/home/home'
import TopCategory from '@/views/category/index'
import SubCategory from '@/views/category/sub'

// 路由规则
const routes = [
//  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]

const router = createRouter({
  // 使用的是哈希模式
  history: createWebHashHistory(),
  routes
})

export default router
