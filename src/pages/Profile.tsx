import React from 'react'

// @ts-ignore
import ProfileIcon from '../assets/profile2-icon.svg'
// @ts-ignore
import OrderIcon from '../assets/order-icon.svg'
// @ts-ignore
import WishlistIcon from '../assets/wishlist-icon.svg'
// @ts-ignore
import SecurityIcon from '../assets/security-icon.svg'
// @ts-ignore
import LogoutIcon from '../assets/logout-icon.svg'

import Order from '../components/profile/Order'
import Wishlist from '../components/profile/Wishlist'
import Security from '../components/profile/Security'
import ProfileContent from '../components/profile/Profile'

// ========= Types =========
export type ProfileTabKey =
  | 'profile'
  | 'orders'
  | 'wishlist'
  | 'security'
  | 'logout'

interface ProfileLayoutProps {
  active: ProfileTabKey
  children?: React.ReactNode
  onNavigate?: (key: ProfileTabKey) => void
}

const Icon: Record<string, string> = {
  profile: ProfileIcon,
  orders: OrderIcon,
  wishlist: WishlistIcon,
  security: SecurityIcon,
  logout: LogoutIcon
}

const NAV: Array<{
  key: ProfileTabKey
  label: string
  icon: keyof typeof Icon
}> = [
  { key: 'profile', label: 'Personal Data', icon: 'profile' },
  { key: 'orders', label: 'Orders', icon: 'orders' },
  { key: 'wishlist', label: 'Wish list', icon: 'wishlist' },
  { key: 'security', label: 'Security & access', icon: 'security' },
  { key: 'logout', label: 'Log out', icon: 'logout' }
]

type User = {
  name: string
  email: string
  avatarUrl?: string
}

export default function Profile() {
  const [tabActive, setTabActive] = React.useState<ProfileTabKey>('profile')

  const USER: User = {
    name: 'John Doe',
    email: 'abc',
    avatarUrl:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Left Nav */}
        <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3 px-2 pb-3 border-b border-gray-100">
            <img
              src={USER.avatarUrl}
              alt={USER.name}
              className="border border-gray-100 rounded-full object-cover w-16 h-16"
            />
            <div>
              <div className="font-semibold text-gray-800">{USER.name}</div>
            </div>
          </div>

          <nav className="mt-3 space-y-1">
            {NAV.map(item => {
              return (
                <button
                  key={item.key}
                  onClick={() => setTabActive(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left transition ${
                    item.key === tabActive
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={Icon[item.icon]}
                    alt={item.icon}
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-light">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-h-[60vh]">
          {tabActive === 'profile' && <ProfileContent />}
          {tabActive === 'orders' && <Order />}
          {tabActive === 'wishlist' && <Wishlist />}
          {tabActive === 'security' && <Security />}
        </main>
      </div>
    </div>
  )
}
