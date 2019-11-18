import firebase from 'firebase/app'
// import firebaseConf from '~/firebase.config.js'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCeR2VCZNqbRsmZBHXdPP9w0M3gnh8UwL0',
    authDomain: 'dupka-4b29b.firebaseapp.com',
    databaseURL: 'https://dupka-4b29b.firebaseio.com',
    projectId: 'dupka-4b29b',
    storageBucket: 'dupka-4b29b.appspot.com',
    messagingSenderId: '37412335465',
    appId: '1:37412335465:web:6379b6718738fcfdac17f8',
    measurementId: 'G-4TH57ZQP7R'
  })
}

// export const authProviders = {
//   Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
// }

export const googleAuth = new firebase.auth.GoogleAuthProvider()

export const fireDb = firebase.firestore()
export const fireAuth = firebase.auth()
export const fireStore = firebase.storage()
