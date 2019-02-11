import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from './firebaseConfig.js'
import { store } from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

const state = store;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    if(!state.getters.isAuthenticated){
      router.replace('/login');
    }
  }
  next();
});

let app
firebase.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})