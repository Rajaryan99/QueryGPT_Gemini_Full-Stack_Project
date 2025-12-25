import React, { useContext, useState, useEffect } from 'react'
import './ChatWindow.css'
import Chat from './Chat'
import { MyContext } from '../Context'
import { ScaleLoader } from 'react-spinners'

export default function ChatWindow() {

  const { prompt, setPrompt, setNewChat, reply, setReply, currThreadId, setPervChats } = useContext(MyContext)

  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);


  const getReply = async () => {
    setLoading(true);
    setNewChat(false)
    // const userMessage  = prompt;

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    }

    try {

      const response = await fetch('/api/chat', option); //http://localhost:7000
      const data = await response.json();
      console.log(data)
      setReply(data.replay)

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  //Append new chat to prevChats

  useEffect(() => {
    if (prompt && reply) {
      setPervChats(pervChats => [
        ...pervChats, {
          role: "user",
          content: prompt
        }, {
          role: "assistant",
          content: reply
        }
      ]
      )
    }

    setPrompt("");
  }, [reply])

  const handleProfileClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItems"> <i class="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
          <div className="dropDownItems"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItems"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
          
        </div>
      }
      <Chat />

      <ScaleLoader color='#fff' loading={loading} />


      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything' value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''} />
          <div id='send' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>

        </div>

        <p className='info'>QueryGPT can make mistake. Check important info. See Cookie Preference.</p>


      </div>
    </div>
  )
}
