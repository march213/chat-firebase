import React from 'react'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import Members from './Members'
import ChatInputBox from './ChatInputBox'

const Channel = () => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox />
      </div>
      <Members />
    </div>
  )
}

export default Channel
