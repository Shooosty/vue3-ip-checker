import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tableIp',
      component: () => import('../views/IpTableView.vue')
    },
    {
      path: '/new-ip',
      name: 'newIp',
      component: () => import('../views/NewIpView.vue')
    },
    {
      path: `/ip/:query`,
      name: 'ip',
      component: () => import('../views/IpView.vue')
    }
  ]
})

export default router
