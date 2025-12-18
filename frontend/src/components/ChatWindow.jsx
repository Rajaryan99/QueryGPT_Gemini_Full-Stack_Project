import React, { useContext } from 'react'
import './ChatWindow.css'
import Chat from './Chat'
import { MyContext } from '../Context'

export default function ChatWindow() {

  const {prompt, setPrompt, reply, setReply} = useContext(MyContext)


  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span><i class="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat/>

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything' />
                  <div id='send'><i className="fa-solid fa-paper-plane"></i></div>

        </div>

        <p className='info'>QueryGPT can make mistake. Check important info. See Cookie Preference.</p>
        

      </div>
    </div>
  )
}
