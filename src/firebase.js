import firebase from 'firebase'
import 'firebase/firestore'

// not necessary to keep it private
const config = {
  apiKey: 'AIzaSyD8jJlmKdQD6H5l_Ro5nEJfPD8IAT1AqnA',
  authDomain: 'chat-app-4b6e4.firebaseapp.com',
  databaseURL: 'https://chat-app-4b6e4.firebaseio.com',
  projectId: 'chat-app-4b6e4',
  storageBucket: 'chat-app-4b6e4.appspot.com',
  messagingSenderId: '723176328272',
}
firebase.initializeApp(config)
const db = firebase.firestore()

export { db }
