import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Login from './Login'
import Search from './Search'
import StatusModal from './StatusModel'

import CartDrawer from '../layout/CartDrawer'

// @ts-ignore
import Logo from '../../assets/logo.svg'
// @ts-ignore
import ProfileIcon from '../../assets/profile-icon.svg'
import { useAuth } from '../../hooks/useAuth'
import { useAuthCheck } from '../../hooks/useAuthCheck'
import { useCart } from '../../hooks/useCart'

const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const [openStatus, setOpenStatus] = useState(false)
  const [statusType, setStatusType] = useState<null | 'error' | 'success'>(null)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [statusDescription, setStatusDescription] = useState<string>('')

  const { login, isLoginSuccess, loginError } = useAuth()
  const { data: user, isLoading, isError } = useAuthCheck()
  const isLoggedIn = !isError && !isLoading && !!user

  useEffect(() => {
    setUserLoggedIn(isLoggedIn)
    console.log('User logged in status:', isLoggedIn)
  }, [isLoggedIn])

  const onLogin = (email: string, password: string, rememberMe: boolean) => {
    console.log('Hello')
    login({ email, password })
  }

  useEffect(() => {
    if (isLoginSuccess && !userLoggedIn) {
      setOpenStatus(true)
      setStatusMessage('Well Done')
      setStatusDescription('You have successfully logged in.')
      setOpenAuth(false)
      setUserLoggedIn(true)
      setStatusType('success')
    }
  }, [isLoginSuccess])

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
          {isCartLoading && (<CartDrawer cartProducts={null} />)}
          {!isCartLoading && (<CartDrawer cartProducts={cartProducts?.cart || null} />)}
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
        onLogin={(e, p, r) => {
          onLogin(e, p, r)
        }}
        onRegister={p => {
          console.log('register', p)
        }}
        onForgotPassword={() => alert('Forgot password clicked')}
        onLoginWithGoogle={() => alert('Google OAuth')}
        onLoginWithFacebook={() => alert('Facebook OAuth')}
        brand="Tech Heim"
      />
      <StatusModal
        open={openStatus}
        type={statusType}
        message={statusMessage}
        description={statusDescription}
        onClose={() => setOpenStatus(false)}
      />
    </>
  )
}

export default Navbar
