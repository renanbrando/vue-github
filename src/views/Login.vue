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
                                <v-text-field outline color="secondary" label="Enter your password" :append-icon="showPassword ? 'visibility_off' : 'visibility'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                                    v-model="password" :rules="passwordRules" required></v-text-field>
                                <v-layout>
                                     <v-btn @click="firebaseLogin" block dark :class=" { 'deep-purple darken-1' : valid, 'purple lighten-3' : !valid, disabled: !valid }">Login</v-btn>
                                </v-layout>
                                <v-layout>
                                    <v-btn @click="loginScreen = false" block dark color="deep-purple darken-1">Sign Up</v-btn>
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
                                <v-text-field outline color="secondary" label="Enter your github username" v-model="signupName" :rules="usernameRules" 
                                    @input="nameRules" :erro="nameError.state" :error-messages="nameError.message" required></v-text-field>
                                <v-text-field outline color="secondary" label="Enter your password" :append-icon="showSPPassword ? 'visibility_off' : 'visibility'" :type="showSPPassword ? 'text' : 'password'" @click:append="showSPPassword = !showSPPassword"
                                    v-model="signupPassword" :rules="passwordRules" required counter></v-text-field>
                                <v-text-field outline color="secondary" label="Confirm your password" :append-icon="showSPCPassword ? 'visibility_off' : 'visibility'" :type="showSPCPassword ? 'text' : 'password'" @click:append="showSPCPassword = !showSPCPassword"
                                    v-model="signupPasswordConfirmation" :rules="passwordConfirmationRules" required counter></v-text-field>
                                <v-layout>
                                     <v-btn @click="firebaseSignUp" block dark :class=" { 'deep-purple darken-1' : validSignup, 'purple lighten-3' : !validSignup, disabled: !valid }">Sign Up</v-btn>
                                </v-layout>
                                <v-layout>
                                    <v-btn @click="loginScreen = true" dark block color="deep-purple darken-1">Back</v-btn>
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
                showPassword: false,
                signupEmail: '',
                signupName: '',
                signupPassword: '',
                signupPasswordConfirmation: '',
                showSPPassword: false,
                showSPCPassword: false,
                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    (v) => !!v || 'Password is required',
                    (v) => v.length >= 6 || 'Password must have at least six characters'
                ],
                passwordConfirmationRules: [
                    (v) => !!v || 'Password confirmation is required',
                    (v) => v == this.signupPassword || 'Passwords must match'
                ],
                usernameRules: [
                    (v) => !!v || 'Username is required'
                ],
                nameError: {
                    state: false,
                    message: ''
                }
            }
        },
        beforeCreate() {
            // Github authentication callback
            /*if (this.$route.query.code) {
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
            }*/
        },
        methods: {
            nameRules(){
                let self = this;
                if (self.signupName){
                    axios.get(`https://api.github.com/users/${self.signupName}?client_id=ad3ff196bbad5e9437a2&client_secret=7b940627c3fc95845760a2bbea5f329cfefdf837`).then((res)=>{
                        console.log(res);
                        self.nameError.state = false;
                        self.nameError.message = '';
                    }).catch((err)=>{
                        console.log(err);
                        self.nameError.state = true;
                        self.nameError.message = 'Github username not found';
                    });
                }
            },
            // Pure github authentication, it was just working on my computer
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
                let self = this;
                
                if (self.valid) {
                    firebase.auth.signInWithEmailAndPassword(self.email, self.password).then(user => {
                        self.$store.commit('setCurrentUser', user);
                        self.$router.push('/home');
                    }).catch(err => {
                        self.$store.commit('showSnackBar', {
                            text: err,
                            color: 'error',
                        });
                    })
                }
            },
            firebaseSignUp(){
                let self = this;

                if (self.validSignup) {
                    // Gets profile picture
                    axios.get(`https://api.github.com/users/${self.signupName}?client_id=ad3ff196bbad5e9437a2&client_secret=7b940627c3fc95845760a2bbea5f329cfefdf837`).then(resp => {
                        firebase.auth.createUserWithEmailAndPassword(self.signupEmail, self.signupPassword).then((auth) => {
                            if (auth) {
                                auth.user.updateProfile({
                                    displayName: self.signupName,
                                    photoURL: resp.data.avatar_url
                                }).then(() => {
                                    self.$store.commit('setCurrentUser', firebase.auth.currentUser);
                                    self.$router.replace('home');
                                })
                            }
                        }).catch(function (error) {
                            self.$store.commit('showSnackBar', {
                                text: error,
                                color: 'error',
                            });
                        });
                    }); 
                }
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