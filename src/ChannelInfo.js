import React, { useState } from 'react'

const ChannelInfo = () => {
  const [value, setValue] = useState('Awesome stuff')
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input className="TopicInput" value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  )
}

export default ChannelInfo
