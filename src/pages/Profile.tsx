import React, { useState, useRef } from 'react'
import { Camera, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

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
import { useValidateToken, useLogout } from '../hooks/useAuth'

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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { data: userData, isLoading } = useValidateToken()
  const logoutMutation = useLogout()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      toast.success('Logged out successfully')
      // Clear avatar from localStorage
      if (userData?.user?.id) {
        localStorage.removeItem(`avatar_${userData.user.id}`)
        localStorage.removeItem(`postalCode_${userData.user.id}`)
      }
      // Redirect to home
      navigate('/')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to logout')
    }
  }

  const handleLogoutClick = () => {
    setTabActive('logout')
  }

  // Load avatar from localStorage on mount
  React.useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${userData?.user?.id}`)
    if (savedAvatar) {
      setAvatarUrl(savedAvatar)
    }
  }, [userData?.user?.id])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setAvatarUrl(result)
      // Save to localStorage
      if (userData?.user?.id) {
        localStorage.setItem(`avatar_${userData.user.id}`, result)
      }
    }
    reader.readAsDataURL(file)
  }

  const USER: User = {
    name: userData?.user?.name || 'Guest',
    email: userData?.user?.email || '',
    avatarUrl:
      avatarUrl ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Left Nav */}
        <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3 px-2 pb-3 border-b border-gray-100">
            <div className="relative group">
              <img
                src={USER.avatarUrl}
                alt={USER.name}
                className="border border-gray-100 rounded-full object-cover w-16 h-16"
              />
              <button
                onClick={handleAvatarClick}
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all cursor-pointer"
                title="Upload avatar"
              >
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{USER.name}</div>
            </div>
          </div>

          <nav className="mt-3 space-y-1">
            {NAV.map(item => {
              if (item.key === 'logout') {
                return (
                  <button
                    key={item.key}
                    onClick={handleLogoutClick}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left transition ${
                      item.key === tabActive
                        ? 'bg-red-50 text-red-700 border-l-2 border-red-600'
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
              }
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
          {tabActive === 'logout' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="max-w-md mx-auto text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogOut className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Log out
                  </h2>
                  <p className="text-gray-500">
                    Are you sure you want to log out? You will need to sign in
                    again to access your account.
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setTabActive('profile')}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
