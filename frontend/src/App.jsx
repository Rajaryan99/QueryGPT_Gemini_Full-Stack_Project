import './App.css'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { MyContext } from './Context.jsx'
import { useState } from 'react'
import {v1 as uuidV1} from 'uuid'


function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setcurrThreadId] = useState(uuidV1())


  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setcurrThreadId
  };

  return (
    <>
    <div className='main'>
      <MyContext.Provider value = {providerValues}>

          <Sidebar/>
          <ChatWindow/>

         </MyContext.Provider>
    </div>
      
    </>
  )
}

export default App
