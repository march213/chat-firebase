import React from 'react'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import Members from './Members'
import ChatInputBox from './ChatInputBox'

const Channel = ({ user, channelId }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  )
}

export default Channel
