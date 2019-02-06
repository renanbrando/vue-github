import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      path: '', 
      components: {
        default: () => import('./views/Home.vue'),
        'header': () => import('./components/Toolbar.vue') 
      },
      meta: {
        requiresAuth: true
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
