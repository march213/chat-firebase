import React, { useState, useEffect } from 'react'
import { db } from './firebase'

export default () => {
  const [channels, setChannels] = useState([])

  // side effect
  useEffect(() => {
    const unsubscribe = db.collection('channels').onSnapshot(snapshot => {
      const docs = []
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setChannels(docs)
    })
    return unsubscribe
  }, []) // empty array make it run once at mount
  return (
    <div className="Nav">
      <div className="User">
        <div>
          <div>Jane Air @march213</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
        <div className="UserImageContainer">
          <img className="UserImage" alt="whatever" src="https://placekitten.com/64/64" />
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a className="active" href={`/channel/${channel.id}`} key={channel.id}>
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  )
}
