import React, { useEffect, useRef } from 'react'
import useCollection from './useCollection'
import MessageWithAvatar from './MessageWithAvatar'
import { isSameDay } from 'date-fns'

function ChatScroller(props) {
  const ref = useRef()
  const shouldScrollRef = useRef(true)

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current
      node.scrollTop = node.scrollHeight
    }
  })

  const handleScroll = () => {
    const node = ref.current
    const { scrollTop, clientHeight, scrollHeight } = node
    const atBottom = scrollHeight === clientHeight + scrollTop
    shouldScrollRef.current = atBottom
  }

  return <div {...props} ref={ref} onScroll={handleScroll} />
}

const Messages = ({ channelId }) => {
  const messages = useCollection(`/channels/${channelId}/messages`, 'createdAt')

  return (
    <ChatScroller className="Messages">
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
    </ChatScroller>
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
