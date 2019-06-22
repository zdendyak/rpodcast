import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/listen',
    name: 'listen',
    component: () => import('../components/views/Listen.vue')
  },
  {
    path: '/rpods/:id',
    name: 'ropd-detail',
    component: () => import('../components/views/RpodDetail.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-rpod',
    name: 'new-rpod',
    component: () => import('../components/views/NewRpod.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-rpod/:id',
    name: 'edit-rpod',
    component: () => import('../components/views/EditRpod.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/views/Register.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let shouldProceed = false

  const token = localStorage.getItem('token')
  if (token) {
    shouldProceed = true
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (shouldProceed) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else if (shouldProceed && (to.name === 'login' || to.name === 'register')) {
    next(false)
  } else {
    next()
  }
})

export default router
