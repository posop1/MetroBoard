import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store/store'
import Home from '../views/Home.vue'
import TaskModalVue from '@/views/Task.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/task/:id',
        name: 'task modal',
        component: TaskModalVue
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/Registration.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.checkAuth) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
