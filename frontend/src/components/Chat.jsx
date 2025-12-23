import { useContext } from 'react'
import './Chat.css'
import { MyContext } from '../Context'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'



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
              <ReactMarkdown rehypePlugins={rehypeHighlight} >{chat.content}</ReactMarkdown>
            }
          </div>
        )
    }

       
      </div>
    </>
  )
}
