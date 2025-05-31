import TaskRequest from '@/views/TaskRequest.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminPanel from '@/views/AdminPanel.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task-request',
      component: TaskRequest,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin-panel',
      component: AdminPanel,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
