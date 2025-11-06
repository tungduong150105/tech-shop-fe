import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Login from './Login'
import Search from './Search'

import CartDrawer from '../layout/CartDrawer'

// @ts-ignore
import Logo from '../../assets/logo.svg'
// @ts-ignore
import ProfileIcon from '../../assets/profile-icon.svg'
import { useValidateToken } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const {
    data: user,
    isLoading,
    isError,
    refetch: refetchUser
  } = useValidateToken()
  const isLoggedIn = !isError && !isLoading && !!user

  useEffect(() => {
    setUserLoggedIn(isLoggedIn)
    console.log('User logged in status:', isLoggedIn)
  }, [isLoggedIn])

  const handleAuthSuccess = () => {
    refetchUser()
    setOpenAuth(false)
  }

  const { data: cartProducts, isLoading: isCartLoading } = useCart()

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-3 py-4 bg-white">
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-10">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 text-sm font-light"
          >
            Home
          </Link>
          <Link
            to="/collection/all"
            className="text-gray-700 hover:text-blue-600 text-sm font-light"
          >
            Product
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-blue-600 text-sm font-light"
          >
            Blog
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-blue-600 text-sm font-light"
          >
            FAQ
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-blue-600 text-sm font-light"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Search />
          {isCartLoading && <CartDrawer cartProducts={null} />}
          {!isCartLoading && (
            <CartDrawer cartProducts={cartProducts?.cart || null} />
          )}
          {userLoggedIn ? (
            <Link to="/profile">
              <img src={ProfileIcon} alt="Profile" className="h-15 w-15" />
            </Link>
          ) : (
            <button
              className="rounded-lg bg-blue-600 px-4 py-3 text-white text-light hover:bg-white hover:text-blue-600 hover:ring"
              onClick={() => setOpenAuth(true)}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>
      <Login
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        onSuccess={handleAuthSuccess}
        onForgotPassword={() => alert('Forgot password clicked')}
        onLoginWithGoogle={() => alert('Google OAuth')}
        onLoginWithFacebook={() => alert('Facebook OAuth')}
        brand="Tech Heim"
      />
    </>
  )
}

export default Navbar
