<template>
  <v-app> 
    <v-content>
      <router-view name="header">
        <Header/>
      </router-view>
      <router-view></router-view>
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
    ...mapState(['currentUser'])
  }
}
</script>