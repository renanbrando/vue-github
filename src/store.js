import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isAuthenticated: false,
        jokes: [],
        jokesData: {
            labels: [],
            datasets: [
                { // one line graph
                    label: 'Jokes Length',
                    data: [],
                    backgroundColor: [
                        '#36495d' // Blue
                    ],
                    borderColor: [
                        '#36495d'
                    ],
                    borderWidth: 3
                }
            ]   
        }
    },
    mutations: {
        add(state, joke) {
            state.jokes.push(joke);
        },
        change(state, jokes) {
            state.jokes = jokes;
        },
        addJokeLength(state, joke) {
            state.jokesData.labels.push(state.jokes.length);
            state.jokesData.datasets[0].data.push(joke.value.length);
        },
        authenticate(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    },
    actions: {
        authenticate(state){
            state.commit('authenticate');
        },
        logout(state){
            state.commit('logout');
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        jokes: state => state.jokes,
        jokesData: state => state.jokesData
    }
})
