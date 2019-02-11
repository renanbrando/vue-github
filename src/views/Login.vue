<template>
    <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center class="loginUnderlay">
            <v-flex xs12 sm4 elevation-6 class="loginBox">
                <v-toolbar class="pt-5 light darken-4">
                    <v-toolbar-title class="white--text">
                        <h4 class="dev-welcome">WELCOME TO VUE GITHUB</h4>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card v-if="loginScreen">
                    <v-card-text class="pt-4">
                        <div>
                            <v-form v-model="valid" ref="form">
                                <v-text-field outline color="secondary" label="Enter your e-mail address" v-model="email"
                                    :rules="emailRules" required></v-text-field>
                                <v-text-field outline color="secondary" type="password" label="Enter your password"
                                    v-model="password" :rules="passwordRules" required></v-text-field>
                                <v-layout justify-space-between>
                                    <v-btn @click="loginScreen = false" dark color="deep-purple darken-1">Sign Up</v-btn>
                                    <v-btn @click="firebaseLogin" dark :class=" { 'white--text' : valid, disabled: !valid }"
                                        color="deep-purple darken-1">Login</v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card v-else>
                    <v-card-text class="pt-4">
                        <div>
                            <v-form v-model="validSignup" ref="formSignUp">
                                <v-text-field outline color="secondary" label="Enter your e-mail address" v-model="signupEmail"
                                    :rules="emailRules" required></v-text-field>
                                <v-text-field outline color="secondary" label="Enter your github username" v-model="signupName"
                                    :rules="nameRules" required></v-text-field>
                                <v-text-field outline color="secondary" type="password" label="Enter your password"
                                    v-model="signupPassword" :rules="passwordRules" required></v-text-field>
                                <v-text-field outline color="secondary" type="password" label="Confirm your password"
                                    v-model="signupPasswordConfirmation" :rules="passwordConfirmationRules" required></v-text-field>
                                <v-layout justify-space-between>
                                    <v-btn @click="loginScreen = true" dark color="deep-purple darken-1">Back</v-btn>
                                    <v-btn @click="firebaseSignUp" dark :class=" { 'white--text' : valid, disabled: !valid }"
                                        color="deep-purple darken-1">Sign Up</v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //import realTimeDatabase from '../axios';
    import axios from 'axios';
    import * as firebase from '../firebaseConfig.js'

    export default {
        data() {
            return {
                loginScreen: true,
                valid: false,
                validSignup: false,
                email: '',
                password: '',
                signupEmail: '',
                signupName: '',
                signupPassword: '',
                signupPasswordConfirmation: '',
                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                nameRules: [
                    (v) => !!v || 'Name is required',
                ],
                passwordRules: [
                    (v) => !!v || 'Password is required',
                    (v) => v.length >= 6 || 'Password must have at least six characters'
                ],
                passwordConfirmationRules: [
                    (v) => !!v || 'Password confirmation is required',
                    (v) => v == this.signupPassword || 'Passwords must match'
                ]
            }
        },
        beforeCreate() {
            if (this.$route.query.code) {
                let code = this.$route.query.code;
                let url =
                    `https://github.com/login/oauth/access_token?client_id=ad3ff196bbad5e9437a2&client_secret=7b940627c3fc95845760a2bbea5f329cfefdf837&code=${code}`;
                axios.get(url, {
                    headers: {
                        Accept: 'application/json'
                    }
                }).then(res => {
                    console.log(res.data.access_token);
                    this.getUser(res.data.access_token);
                });
            }
        },
        methods: {
            // Pure github authentication, was just working on my computer
            submit() {
                if (this.valid) {
                    axios.get(
                        `https://github.com/login/oauth/authorize?login=${this.email}&client_id=ad3ff196bbad5e9437a2`
                    ).then(resp => {
                        // eslint-disable-next-line no-console
                        console.log(resp);
                        window.location = resp.config.url;
                    });
                }
            },
            login(token) {
                this.$store.dispatch("authenticate", token).then(() => {
                    this.$router.push('/home');
                }, error => {
                    // eslint-disable-next-line no-console
                    console.error(error);
                });
            },
            getUser(token) {
                axios.get(`https://api.github.com/user?access_token=${token}`).then(user => {
                    this.$store.commit('setUser', user.data);
                    this.login(token);
                });
            },
            // Firebase authentication
            firebaseLogin(){
                let self = this

                firebase.auth.signInWithEmailAndPassword(self.email, self.password).then(user => {
                    self.$store.commit('setCurrentUser', user);
                    self.$router.push('/home');
                }).catch(err => {
                    console.log(err)
                    //self.errorMsg = err.message
                })
            },
            firebaseSignUp(){
               let self = this
                firebase.auth.createUserWithEmailAndPassword(self.signupEmail, self.signupPassword).then((auth)=>{
                    if(auth){
                        auth.user.updateProfile({
                            displayName: self.signupName
                        }).then( (s)=> {
                            console.log(s);
                            self.$store.commit('setCurrentUser', firebase.auth.currentUser);
                            self.$router.replace('home');
                        })
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            clear() {
                this.$refs.form.reset()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../material-colours.scss';
    $prod: "dev";
    $primary-color: #505050;
    $secondary-color: rebeccapurple;

    @mixin transform($property) {
        -webkit-transform: $property;
        -ms-transform: $property;
        transform: $property;
    }

    %boxDefaults {
        border: 10px solid $material-theme-dark-card;
    }

    .loginBox {
        @include transform(rotate(350deg));
        @extend %boxDefaults;
    }

    .#{$prod}-welcome {
        color: $material-deep-purple-700;
    }

    .loginOverlay {
        background-color: $material-theme-dark-background;

        .loginUnderlay {
            background-color: $primary-color;
        }
    }
</style>