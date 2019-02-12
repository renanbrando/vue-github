<template>
  <v-app> 
    <v-content>
      <router-view name="header">
        <Header/>
      </router-view>
      <router-view></router-view>
      <v-snackbar v-model="snackbar.show" :bottom="true" :timeout="snackbar.timeout" :color="snackbar.color">
            {{ snackbar.text }}
            <v-btn flat @click="snackbar.show = false">
                Close
            </v-btn>
      </v-snackbar>
    </v-content>  
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Toolbar.vue'

export default {
  name: 'App',
  components: { Header },
  computed: {
    snackbar(){
      return this.$store.getters.snackbar;
    },
    ...mapState(['currentUser'])
  }
}
</script>