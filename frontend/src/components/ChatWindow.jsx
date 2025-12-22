import React, { useContext, useState, useEffect } from 'react'
import './ChatWindow.css'
import Chat from './Chat'
import { MyContext } from '../Context'
import { ScaleLoader } from 'react-spinners'

export default function ChatWindow() {

  const { prompt, setPrompt, reply, setReply, currThreadId, setPervChats } = useContext(MyContext)

  const [loading, setLoading] = useState(false)


  const getReply = async () => {
    console.log('message', prompt, "threadId", currThreadId)
    setLoading(true);
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

      const response = await fetch('http://localhost:7000/api/chat', option);
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

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>QueryGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
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
