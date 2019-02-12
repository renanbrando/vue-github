<template>
    <div>
        <v-layout row>
            <v-flex xs12 sm10 offset-sm1>
                <v-card>
                    <v-toolbar color="deep-purple lighten-5" light>
                        <v-text-field hide-details prepend-icon="search" single-line v-model="search" placeholder="Search for a git repository..."></v-text-field>
                    </v-toolbar>

                    <v-list>
                        <v-list-group v-for="repo in repositories" :key="repo.name" v-model="repo.activator" no-action>
                            <v-list-tile slot="activator" class="pa-3">
                                <v-list-tile-content>
                                    <v-list-tile-title class="font-weight-bold">{{ repo.name }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-badge overlap left class="mx-2">
                                    <span small slot="badge">{{repo.stargazers_count}}</span>
                                    <v-icon large color="amber">
                                        star
                                    </v-icon>
                                </v-badge>
                                <v-badge overlap left class="mx-2">
                                    <span small slot="badge">{{repo.stargazers_count}}</span>
                                    <v-icon large color="grey">
                                        call_split
                                    </v-icon>
                                </v-badge>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                    Description: {{ repo.description ? repo.description : "No description" }}
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>License: {{ repo.license ? repo.license.name : "No license" }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar" :bottom="true" :timeout="snackbarTimeout">
            {{ snackbarText }}
            <v-btn color="pink" flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Home",
    components: {
        
    },
    data() {
        return {
            repos: [],
            search: "",
            snackbar: false,
            snackbarTimeout: 6000,
            snackbarText: ""
        }
    },
    beforeCreate(){
        let self = this;
        axios.get(`https://api.github.com/users/${self.$store.getters.currentUser.displayName}/repos`).then((res) => {
            self.repos = res.data;
        }); 

        axios.get().then(resp => {
            let user = self.$store.getters.currentUser;
            user.photoURL = resp.data.avatar_url;
            self.$store.commit('setCurrentUser', user);
        });
    },
    methods: {
      
    },
    computed:{
        repositories(){
            if (this.search){
                return this.repos.filter(repo => repo.name.indexOf(this.search) > -1);
            }
            return this.repos;
        }
    }
}
</script>

<style scopped>
    
</style>