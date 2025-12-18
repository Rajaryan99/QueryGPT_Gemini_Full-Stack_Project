import './App.css'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { MyContext } from './Context.jsx'
import { useState } from 'react'


function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null)

  const providerValues = {
    prompt, setPrompt,
    reply, setReply
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
