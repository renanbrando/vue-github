<template>
    <div>
        <v-navigation-drawer temporary v-model="drawer" app light>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="user.avatar_url">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{user.login}}</v-list-tile-title>
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
export default {
    name: "Header",
    data() {
        return {
            user: this.$store.getters.user,
            drawer: false,
            items: [
                { title: 'Home', icon: 'list', path: "/" },
                { title: 'Favorites', icon: 'favorite', path: "/favorites" }
            ]
        }
    },
    methods: {
        logout(){
            this.$store.dispatch("logout").then( () => {
                // eslint-disable-next-line no-console
                console.log("User authenticated? " + this.$store.getters.isAuthenticated);
                this.$router.push('/login');
            }, error => {
                // eslint-disable-next-line no-console
                console.error(error);
            })     
        }
    }
}
    
</script>

<style scoped>
</style>