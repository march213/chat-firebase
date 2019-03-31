import React, { useState } from 'react'
import { db } from './firebase'

const ChatInputBox = ({ user }) => {
  const [value, setValue] = useState('')
  return (
    <form
      className="ChatInputBox"
      onSubmit={async e => {
        e.preventDefault()
        // another way to get the input value
        // const inputValue = e.target.elements[0].value
        // e.target.reset() - after form submitting
        await db
          .collection('channels') // posible to query like so: channels/general/messages
          .doc('general')
          .collection('messages')
          .add({
            // make a refernce to a user
            user: db.collection('users').doc(user.uid),
            text: value,
            createdAt: new Date(),
          })
        setValue('')
      }}
    >
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

export default ChatInputBox
