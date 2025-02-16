import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: () => import('@/views/Portfolio.vue'),
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import('@/views/Contact.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
