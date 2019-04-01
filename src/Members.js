import React from 'react'
import useColletion from './useCollection'

const Members = ({ channelId }) => {
  const members = useColletion('users', 'displayName', [`channels.${channelId}`, '==', true])

  return (
    <div className="Members">
      <div>
        {members.map(member => {
          return (
            <div className="Member" key={member.id}>
              <div className="MemberStatus online" />
              {member.displayName}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Members
