<template>
    <v-content>
        <div >
            
        </div>
        <v-snackbar v-model="snackbar" :bottom="true" :timeout="snackbarTimeout">
            {{ snackbarText }}
            <v-btn color="pink" flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-content>
</template>

<script>

export default {
    name: "Home",
    components: {
        
    },
    data() {
        return {
            snackbar: false,
            snackbarTimeout: 6000,
            snackbarText: ""
        }
    },
    methods: {
       
    },
    computed:{
       
    }
}
</script>

<style scopped>
    
</style>