import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
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
