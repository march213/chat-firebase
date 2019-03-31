import React from 'react'
import useCollection from './useCollection'

export default () => {
  const channels = useCollection('channels', 'topic')
  return (
    <div className="Nav">
      <div className="User">
        <div>
          <div>Jane Air @march213</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
        <div className="UserImageContainer">
          <img className="UserImage" alt="whatever" src="https://placekitten.com/64/64" />
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a className="active" href={`/channel/${channel.id}`} key={channel.id}>
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  )
}
