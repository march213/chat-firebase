import React, { useEffect } from 'react'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import Members from './Members'
import ChatInputBox from './ChatInputBox'
import { db } from './firebase'

const Channel = ({ user, channelId }) => {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    })
  }, [user.uid, channelId])

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  )
}

export default Channel
