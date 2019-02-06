import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
