import React, { useContext, useEffect } from 'react'
import './Sidebar.css'
import { MyContext } from '../Context'
import { v1 as uuidv1 } from 'uuid'
const API_URL = import.meta.env.VITE_BACKEND_URL;
export default function Sidebar() {

  const { allThreads, setAllThreads, currThreadId, setPrompt, setReply, setcurrThreadId, setPervChats, setNewChat } = useContext(MyContext)

  const getAllThreads = async () => {

    try {

      const res = await fetch(`${API_URL}/api/thread`); //http://localhost:7000
      const data = await res.json();
      const filterData = data.map(thread => ({ threadId: thread.threadId, title: thread.title }))
      // console.log(filterData)
      setAllThreads(filterData)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("")
    setReply(null);
    setcurrThreadId(uuidv1());
    setPervChats([])


  }


  const changeThread = async (newThreadId) => {
    setcurrThreadId(newThreadId);

    try {

      const res = await fetch(`${API_URL}/api/thread/${newThreadId}`) //http://localhost:7000
      const data = await res.json();
      console.log(data)
      setPervChats(data);
      setNewChat(false);
      setReply(null)

    } catch (error) {
      console.log(error)
    }
  }

  const deleteThread = async (threadId) => {
    try {

      const res  = await fetch(`${API_URL}/api/thread/${threadId}`, {method: 'DELETE'}); //http://localhost:7000
    const data = await res.json();
    console.log(data)

      //updated threads
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId  === currThreadId){
        createNewChat();
      }


    } catch (error) {
      console.log(error)
    }

  }

  return (
    <section className='sidebar'>
      {/* new chat button */}

      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="logo" className='logo' />

        <span><i className="fa-regular fa-pen-to-square"></i></span>
      </button>

      {/* history */}

      <ul className='history'>
        {
          allThreads?.map((thread, idx) => (
            <li key={idx} onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted": ""}
             >
              {thread.title}
              <i className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId)
                }}
                ></i>
            </li>
          ))
        }
      </ul>
      {/* sign */}

      <div className='sign'>
        <p>QueryGPT &hearts;</p>
      </div>

    </section>
  )
}
