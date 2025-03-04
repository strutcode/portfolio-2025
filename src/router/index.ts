import App from '../App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: App,
  },
  {
    name: 'about',
    path: '/about',
    component: App,
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: App,
  },
  {
    name: 'contact',
    path: '/contact',
    component: App,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
