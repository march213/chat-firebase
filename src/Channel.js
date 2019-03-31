import React from 'react'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import Members from './Members'
import ChatInputBox from './ChatInputBox'

const Channel = ({ user }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  )
}

export default Channel
