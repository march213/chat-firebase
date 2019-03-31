import React, { useState, useEffect } from 'react'
import { firebase } from './firebase'
import Nav from './Nav'
import Channel from './Channel'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // firebase return method to unsubscribe
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
  }

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}

export default App
