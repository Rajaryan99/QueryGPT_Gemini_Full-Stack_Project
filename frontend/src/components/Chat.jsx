import { useContext } from 'react'
import './Chat.css'
import { MyContext } from '../Context'


export default function Chat() {
  const { newChat, pervChats } = useContext(MyContext);
  // console.log("pervChats:", pervChats);

  return (
    <>
      {newChat && <h1>Start New Chat</h1>}
      <div className="chats">
    {
        pervChats?.map((chat, idx) => 
          <div className={chat.role === "user"? "userDiv" : "GPTdiv"} key={idx}>

            {
              chat.role === "user"? <p className='userMessage'> {chat.content}</p> : 
              <p className='GPTmessage'>{chat.content}</p>
            }
          </div>
        )
    }

       
      </div>
    </>
  )
}
