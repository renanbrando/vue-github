import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authToken: "",
        isAuthenticated: false,
        user: {}
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
        }
    },
    actions: {
        authenticate(state, token){
            state.commit('authenticate', token);
        },
        logout(state){
            state.commit('logout');
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        authToken: state => state.authToken,
        user: state => state.user
    }
})
