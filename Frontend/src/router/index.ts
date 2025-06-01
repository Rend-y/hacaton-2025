import TaskRequest from '@/views/TaskRequest.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminPanel from '@/views/AdminPanel.vue'
import NotFound from '@/views/NotFound.vue'
import Requests from '@/views/Requests.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task-request',
      component: TaskRequest,
    },
    {
      path: '/requests',
      name: 'requests',
      component: Requests,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        if (!token) {
          next()
        } else {
          next('admin')
        }
      },
    },
    {
      path: '/admin/',
      name: 'admin-panel',
      component: AdminPanel,
      beforeEnter: (to, from, next) => {
        const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        if (token) {
          next()
        } else {
          next('admin/login')
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
