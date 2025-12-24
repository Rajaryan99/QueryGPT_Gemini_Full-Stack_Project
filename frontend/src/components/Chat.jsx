import { useContext, useEffect, useState } from 'react'
import './Chat.css'
import { MyContext } from '../Context'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'



export default function Chat() {
  const { newChat, pervChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);
  // console.log("pervChats:", pervChats);

  useEffect(() => {

    if(reply === null){
      setLatestReply(null);
      return
    }

    if(!pervChats?.length) return

    const content = reply.split(" "); // word by word split
    // const content = reply.split("");// character  by chracter split

    let idx = 0;
    const interval = setInterval(() => {

       setLatestReply(content.slice(0, idx+1).join(" ")); //word by word split 
        // setLatestReply(content.slice(0, idx+1).join("")); // character by character 

      idx++;
      if(idx >= content.length) clearInterval(interval);
    }, 40)

    return () => clearInterval(interval)

  }, [pervChats, reply])

  return (
    <>
      {newChat && <h1>Start New Chat</h1>}
      <div className="chats">
    {
        pervChats?.slice(0, -1).map((chat, idx) => 
          <div className={chat.role === "user"? "userDiv" : "GPTdiv"} key={idx}>

            {
              chat.role === "user"? <p className='userMessage'> {chat.content}</p> : 
              <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{chat.content}</ReactMarkdown>
            }
          </div>
        )
    }

    {
      pervChats.length > 0 && latestReply !== null && 
      <div className='GPTdiv' key={"typing"}>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{latestReply}</ReactMarkdown>

      </div>
    }

    
    {
      pervChats.length > 0 && latestReply === null && 
      <div className='GPTdiv' key={"non-typing"}>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{pervChats[pervChats.length-1].content}</ReactMarkdown>

      </div>
    }

       
      </div>
    </>
  )
}
