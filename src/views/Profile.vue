<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>
            <v-flex xs12 md8>
                <v-card>
                    <v-form>
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex xs12 md4>
                                    <v-text-field label="Company" v-model="userData.company" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field label="User Name" v-model="userData.login" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field label="Email Address" v-model="userData.email" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md12>
                                    <v-text-field label="Full Name" v-model="userData.name" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md12>
                                    <v-text-field label="Location" v-model="userData.location" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field label="Created" v-model="userData.created_at" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field label="Last Updated" v-model="userData.updated_at" class="purple-input" disabled />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-text-field class="purple-input" v-model="userData.public_repos" label="Number of Repositories" type="number" disabled/>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field class="purple-input" label="Available for Hiring" :value="userData.hireable ? 'Yes, hire me!' : 'Nop'" disabled />
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card>
            </v-flex>
            <v-flex xs12 md4>
                <v-card>
                    <v-avatar class="mx-auto py-3 d-block" size="130">
                        <img :src="user.photoURL">
                    </v-avatar>
                    <v-card-text class="text-xs-center">
                        <h6 class="category text-gray font-weight-thin mt-3">Github User</h6>
                        <h4 class="card-title font-weight-light">{{userData.name}}</h4>
                        <p class="card-description font-weight-light">{{userData.bio ? userData.bio : 'No bio information available'}}</p>
                        <v-btn color="deep-purple darken-1" dark round class="font-weight-light" :href="userData.html_url" target="_blank">View Profile on Github</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Profile",
    data(){
        return {
            userData: {}
        }
    },
    beforeCreate(){
        let self = this;
        axios.get(`https://api.github.com/users/${self.$store.getters.currentUser.displayName}?client_id=ad3ff196bbad5e9437a2&client_secret=7b940627c3fc95845760a2bbea5f329cfefdf837`).then(resp => {
            self.userData = resp.data;
        }).catch(error => {
            self.$store.commit('showSnackbar', {
                text: error,
                color: 'error'
            });
        });
    },
    computed:{
        user(){
            let self = this;
            return self.$store.getters.currentUser;
        }
    }
}
</script>