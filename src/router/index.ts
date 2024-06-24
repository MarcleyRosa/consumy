import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('../views/StoresView.vue')
    }
    ,
    {
      path: '/store/:id/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/store/:store_id/products/:id',
      name: 'store/product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/search/itens',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    }
    
    
  ]
})

export default router
