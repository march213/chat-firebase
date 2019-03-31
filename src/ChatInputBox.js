import React, { useState } from 'react'

const ChatInputBox = () => {
  const [value, setValue] = useState('')
  return (
    <div className="ChatInputBox">
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default ChatInputBox
