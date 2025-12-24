import './App.css'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { MyContext } from './Context.jsx'
import { useState } from 'react'
import {v1 as uuidv1} from 'uuid'


function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setcurrThreadId] = useState(uuidv1());
  const [pervChats, setPervChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([])


  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setcurrThreadId,
    newChat, setNewChat,
    pervChats, setPervChats,
    allThreads, setAllThreads

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
