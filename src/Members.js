import React, { useEffect } from 'react'
import { db } from './firebase'

const Members = ({ channelId }) => {
  useEffect(() => {
    return db
      .collection('users')
      .where(`channels.${channelId}`, '==', true)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data())
        })
      })
  }, [channelId])
  return (
    <div className="Members">
      <div>
        <div className="Member">
          <div className="MemberStatus offline" />
          Jane Air
        </div>
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  )
}

export default Members
