import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCQIyFLJ2KBwhDJKzB7M_3H79hTWt8GiUU",
    authDomain: "vue-github.firebaseapp.com",
    databaseURL: "https://vue-github.firebaseio.com",
    projectId: "vue-github",
    storageBucket: "vue-github.appspot.com",
    messagingSenderId: "204679110144"
  };

firebase.initializeApp(config);

// firebase utils
const auth = firebase.auth()
const currentUser = auth.currentUser

export {
    auth,
    currentUser,
}