<template>
    <div>
        <v-navigation-drawer temporary v-model="drawer" app light>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="user.photoURL">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app dark color="purple">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Github</span>
                <span class="font-weight-light">VUE</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat href="https://github.com/renanbrando/vue-github" target="_blank">
                <span>View Git</span>
            </v-btn>
            <v-btn flat @click="logout">
                <v-icon>logout</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>


<script>
import * as firebase from '../firebaseConfig.js'

export default {
    name: "Header",
    data() {
        return {
            drawer: false,
            items: [{
                    title: 'Home',
                    icon: 'list',
                    path: "/home"
                },
                {
                    title: 'Favorites',
                    icon: 'favorite',
                    path: "/favorites"
                },
                {
                    title: 'Profile',
                    icon: 'account_circle',
                    path: "/profile"
                }
            ]
        }
    },
    methods: {
        logout() {
            let self = this;

            firebase.auth.signOut().then(() => {
                self.$store.dispatch('clearData');
                self.$router.push('/login');
            }).catch(err => {
                self.$store.commit('showSnackBar', {
                    text: err,
                    color: 'error',
                });
            })
        }
    },
    computed: {
        user(){
            let self = this;
            return self.$store.getters.currentUser;
        }
    }
}
    
</script>

<style scoped>
</style>