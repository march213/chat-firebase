import React from 'react'
import useCollection from './useCollection'
import { firebase } from './firebase'

export default ({ user }) => {
  const channels = useCollection('channels')
  return (
    <div className="Nav">
      <div className="User">
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                firebase.auth().signOut()
              }}
            >
              log out
            </button>
          </div>
        </div>
        <div className="UserImageContainer">
          <img
            className="UserImage"
            alt="whatever"
            src={user.photoUrl ? user.photoUrl : 'https://placekitten.com/64/64'}
          />
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
