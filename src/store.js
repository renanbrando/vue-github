import Vue from 'vue'
import Vuex from 'vuex'
const firebase = require('./firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
firebase.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
    }
})

export const store = new Vuex.Store({
    state: {
        authToken: "",
        isAuthenticated: false,
        user: {},
        currentUser: null,
    },
    mutations: {
        authenticate(state, token){
            state.isAuthenticated = true;
            state.authToken = token;
        },
        setUser(state, user){
            state.user = user;
        },
        logout(state){
            state.isAuthenticated = false;
        },
        setCurrentUser(state, user) {
            state.currentUser = user
        }
    },
    actions: {
        authenticate(state, token){
            state.commit('authenticate', token);
        },
        logout(state){
            state.commit('logout');
        },
        clearData({ commit }) {
            commit('setCurrentUser', null)
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        authToken: state => state.authToken,
        user: state => state.user,
        currentUser: state => state.currentUser
    }
})

