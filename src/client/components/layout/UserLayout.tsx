import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import Header from '../common/Header'
import ChatWidget from '../chat/ChatWidget'
import AiChatWidget from '../chat/AiChatWidget'

const UserLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-40">
        <Outlet/>
      </main>
      <Footer />
      <ChatWidget />
      <AiChatWidget />
    </>
  )
}

export default UserLayout
