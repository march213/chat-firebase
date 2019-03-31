import React from 'react'
import useCollection from './useCollection'
import MessageWithAvatar from './MessageWithAvatar'

const Messages = ({ channelId }) => {
  const messages = useCollection(`/channels/${channelId}/messages`, 'createdAt')
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1]
        const showDay = true
        const showAvatar = !previous || message.user.id !== previous.user.id
        if (showAvatar) {
          return <MessageWithAvatar key={message.id} message={message} showDay={showDay} />
        }
        return (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
