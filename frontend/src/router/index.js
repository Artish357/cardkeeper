import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mystery/:id',
    name: 'Mystery',
    component: ()=> import(/* webpackChunkName: "mystery" */ '../views/Mystery.vue')
  },
  {
    path: '/icon/:id',
    name: 'Icon',
    component: ()=> import(/* webpackChunkName: "icon" */ '../views/Icon.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
