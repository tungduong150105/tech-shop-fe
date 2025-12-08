import { Footer, Header } from '@/shared/components/layout'
import Sidebar from '../components/SideBar'
import Profile from '../components/Profile'
import { useLocation } from 'react-router-dom';

export function Account() {
  const location = useLocation();
  
  return (
    <>
      <Header />
      <div className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] pb-12">
          <div className="mt-8 flex flex-row gap-6">
            <Sidebar />
            {location.pathname === '/account/profile' && <Profile />}
            {location.pathname === '/account/wishlist' && <div>Wishlist Page</div>}
            {location.pathname === '/account/orders' && <div>Orders Page</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
