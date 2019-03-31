import React from 'react'
import { Link } from '@reach/router'
import useCollection from './useCollection'
import { firebase } from './firebase'

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : '',
      }
    }}
  />
)

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
          <NavLink to={`/channel/${channel.id}`} key={channel.id}>
            # {channel.id}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
