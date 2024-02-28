import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '@/store/store'
import Board from '@/views/Board.vue'
import Task from '@/views/Task.vue'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/board/:boardId',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:taskId',
        name: 'task modal',
        component: Task
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
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

router.beforeEach((to) => {
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
