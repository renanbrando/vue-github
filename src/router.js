import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/login', 
      components: {
        default: () => import('./views/Login.vue')
      },
      meta: {
        requiresAuth: false
      }  
    },
    { 
      path: '/home', 
      components: {
        default: () => import('./views/Home.vue'),
        'header': () => import('./components/Toolbar.vue') 
      },
      meta: {
        requiresAuth: false
      }
    },
    { 
      path: '/home:code', 
      components: {
        default: () => import('./views/Home.vue'),
        'header': () => import('./components/Toolbar.vue') 
      },
      meta: {
        requiresAuth: false
      }
    },
    { 
      path: '/favorites', 
      components: {
        default: () => import('./views/Favorites.vue'),
        'header': () => import('./components/Toolbar.vue') 
      },
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '*', 
      components: {
        default: () => import('./views/Home.vue'),
        'header': () => import('./components/Toolbar.vue') 
      },
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = Firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router
