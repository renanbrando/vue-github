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

                             <v-list-tile>
                                <v-btn dark small :class="{'grey': !repo.favorite, 'pink': repo.favorite}" @click="favoriteRepo(repo)">
                                    <v-icon dark>favorite</v-icon>
                                </v-btn>
                            </v-list-tile>

                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

export default {
    name: "Home",
    components: {
        
    },
    data() {
        return {
            search: "",
        }
    },
    methods: {
        favoriteRepo(repo){
            let self = this;
            let repos = self.$store.getters.repositories;
            for (let element of repos){
                if (element.id == repo.id)
                    element.favorite = !repo.favorite;
            }
            self.$store.commit('setRepositories', repos);  
        }
    },
    computed:{
        repositories(){
            let self = this;
            if (self.search){
                return self.$store.getters.repositories.filter(repo => repo.name.indexOf(this.search) > -1 && repo.favorite);
            }
            return self.$store.getters.repositories.filter(repo => repo.favorite);
        }
    }
}
</script>

<style scopped>
    
</style>