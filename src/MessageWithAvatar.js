import React, { useState, useEffect } from 'react'
import { db } from './firebase'

const MessageWithAvatar = ({ message, showDay }) => {
  const author = useDoc(message.user.path)
  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div className="Avatar" style={author && { backgroundImage: `url(${author.photoUrl})` }} />
        <div className="Author">
          <div className="AuthorName">
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  )
}

const cache = {}
const pendingCache = {}

function useDoc(path) {
  const [doc, setDoc] = useState(cache[path])

  useEffect(() => {
    if (doc) return
    let stillMounted = true
    const pending = pendingCache[path]
    const promise = pending || (pendingCache[path] = db.doc(path).get())
    promise.then(doc => {
      if (stillMounted) {
        const user = {
          ...doc.data(),
          id: doc.id,
        }
        setDoc(user)
        cache[path] = user
      }
    })
    return () => {
      stillMounted = false
    }
  }, [path])

  return doc
}

export default MessageWithAvatar
