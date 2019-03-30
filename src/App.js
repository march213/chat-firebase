import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

// not necessary to keep it private
const config = {
  apiKey: 'AIzaSyD8jJlmKdQD6H5l_Ro5nEJfPD8IAT1AqnA',
  authDomain: 'chat-app-4b6e4.firebaseapp.com',
  databaseURL: 'https://chat-app-4b6e4.firebaseio.com',
  projectId: 'chat-app-4b6e4',
  storageBucket: 'chat-app-4b6e4.appspot.com',
  messagingSenderId: '723176328272',
}
firebase.initializeApp(config)

function App() {
  const [channels, setChannels] = useState([
    {
      topic: 'Something hardcoded',
      id: 'genral',
    },
  ])
  return (
    <div className="App">
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
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
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
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Jane Air
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
