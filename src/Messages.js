import React from 'react'
import useCollection from './useCollection'
import MessageWithAvatar from './MessageWithAvatar'
import { isSameDay } from 'date-fns'

const Messages = ({ channelId }) => {
  const messages = useCollection(`/channels/${channelId}/messages`, 'createdAt')
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1]
        const showDay = shouldShowDay(previous, message)
        const showAvatar = shouldShowAvatar(previous, message)
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

function shouldShowDay(previous, message) {
  const isFirst = !previous
  if (isFirst) return true

  const isNewDay = !isSameDay(previous.createdAt.seconds * 1000, message.createdAt.seconds * 1000)
  return isNewDay
}

function shouldShowAvatar(previous, message) {
  const isFirst = !previous
  if (isFirst) return true

  const isDifferentUser = message.user.id !== previous.user.id
  if (isDifferentUser) return true

  const hasBeenAwile = message.createdAt.seconds - previous.createdAt.seconds > 180
  return hasBeenAwile
}

export default Messages
