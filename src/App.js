import React, { useState, useEffect } from 'react'

import { firebase, db } from './firebase'
import Nav from './Nav'
import Channel from './Channel'

function App() {
  const user = useUserAuth()

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel user={user} />
    </div>
  ) : (
    <Login />
  )
}

function Login() {
  const [authError, setAuthError] = useState(null)

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (err) {
      setAuthError(err)
    }
  }

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  )
}

function useUserAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // firebase return method to unsubscribe
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }
        setUser(user)
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true })
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}

export default App
