import './App.css'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import { MyContext } from './Context.jsx'


function App() {

  const providerValues = {};

  return (
    <>
    <div className='main'>
      <MyContext.Provider values = {providerValues}>

          <Sidebar/>
          <ChatWindow/>

         </MyContext.Provider>
    </div>
      
    </>
  )
}

export default App
