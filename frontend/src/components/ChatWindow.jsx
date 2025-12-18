import React, { useContext } from 'react'
import './ChatWindow.css'
import Chat from './Chat'
import { MyContext } from '../Context'

export default function ChatWindow() {

  const {prompt, setPrompt, reply, setReply, currThreadId} = useContext(MyContext)


  const getReply = async () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        message: prompt,
        threadId: currThreadId
      })
    }

    try {

     const response = await fetch('http://localhost:7000/api/chat', option);
     const data = await response.json();
     console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat/>

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything' value={prompt}  onChange={(e) => setPrompt(e.target.value)} />
                  <div id='send' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>

        </div>

        <p className='info'>QueryGPT can make mistake. Check important info. See Cookie Preference.</p>
        

      </div>
    </div>
  )
}
