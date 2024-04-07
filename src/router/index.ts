import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: () => import('../components/FirstComponent.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
