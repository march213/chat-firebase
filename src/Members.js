import React from 'react'
import useColletion from './useCollection'

const Members = ({ channelId }) => {
  const members = useColletion('users', undefined, [`channels.${channelId}`, '==', true])

  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => {
          return (
            <div className="Member" key={member.id}>
              <div className={`MemberStatus ${member.status ? member.status.state : 'offline'}`} />
              {member.displayName}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function sortByName(a, b) {
  return a.displayName > b.displayName ? 1 : a.displayName < b.displayName ? -1 : 0
}

export default Members
