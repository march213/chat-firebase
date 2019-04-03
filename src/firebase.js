import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

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
const rtdb = firebase.database()

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  }

  // firestore
  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const rtdbRef = rtdb.ref(`/status/${user.uid}`)
  const userDoc = db.doc(`/users/${user.uid}`)

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      })
      return
    }
    await rtdbRef.onDisconnect().set(isOfflineForRTDB)
    rtdbRef.set(isOnlineForRTDB)
    userDoc.update({
      status: isOnlineForFirestore,
    })
  })
}

export { db, firebase }
