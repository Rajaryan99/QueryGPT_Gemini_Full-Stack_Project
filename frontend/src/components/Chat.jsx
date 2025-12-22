import { useContext } from 'react'
import './Chat.css'
import { MyContext } from '../Context'


export default function Chat() {
  const { newChat, prevChats } = useContext(MyContext);
  return (
    <>
      {newChat && <h1>Tho Chaliye Suru karte hai!!</h1>}
      <div className="chats">
        <div className="userDiv">
          <p>User Message</p>
        </div>

        <div className="GPTdiv">
          <p>GPT generated message</p>
        </div>
      </div>
    </>
  )
}
