import React, { useContext, useEffect } from 'react'
import './Sidebar.css'
import { MyContext } from '../Context'

export default function Sidebar() {

  const {allThreads, setAllThreads, currThreadId} = useContext(MyContext)

  const getAllThreads = async () => {

    try {

     const res =  await fetch('http://localhost:7000/api/thread');
     const data = await res.json();
     console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  return (
    <section className='sidebar'>
      {/* new chat button */}

      <button>
        <img src="src/assets/blacklogo.png" alt="logo" className='logo' />

        <span><i className="fa-regular fa-pen-to-square"></i></span>
      </button>

      {/* history */}

        <ul className='history'>
          <li>Thread1</li>
          <li>Thread2</li>
          <li>Thread3</li>
        </ul>
      {/* sign */}

      <div className='sign'>
        <p>QueryGPT &hearts;</p>
      </div>
      
    </section>
  )
}
