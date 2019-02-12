import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from './firebaseConfig.js'
import { store } from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

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