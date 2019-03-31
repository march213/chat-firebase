import React, { useState, useEffect } from 'react'
import { db } from './firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    db.collection('/channels/general/messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const messages = []
        snapshot.forEach(doc => {
          messages.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setMessages(messages)
      })
  }, [])
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, i) => {
        if (i === 0) {
          return (
            <div key={message.id}>
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">12/6/2018</div>
                <div className="DayLine" />
              </div>
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div className="AuthorName">
                    <span className="UserName">Jane Air </span>
                    <span className="TimeStamp">3:37 PM</span>
                  </div>
                  <div className="MessageContent">{message.text}</div>
                </div>
              </div>
            </div>
          )
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
