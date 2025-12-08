import { Link } from 'react-router-dom'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Login } from '@/features/authenticate'

import StatusModal from '../ui/StatusModal'

import { useUser } from '@/features/user'

import { Dropdown } from 'antd'

export function Header() {
  const [currentUser, setCurrentUser] = useState<boolean>(false)
  const [openAuth, setOpenAuth] = useState(false)
  const { user } = useUser()
  // const { data: userData } = useValidateToken()

  useEffect(() => {
    if (user) {
      setCurrentUser(true)
    } else {
      setCurrentUser(false)
    }
  }, [user])

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusModalMessage, setStatusModalMessage] = useState('')
  const [statusModalDescription, setStatusModalDescription] = useState('')
  const [statusModalType, setStatusModalType] = useState<'success' | 'error'>(
    'success'
  )

  const showSuccessModal = () => {
    setStatusModalType('success')
    setStatusModalMessage('Login Successful')
    setStatusModalDescription('You have successfully logged in.')
    setShowStatusModal(true)
  }

  const showErrorModal = () => {
    setStatusModalType('error')
    setStatusModalMessage('Login Failed')
    setStatusModalDescription(
      'There was an error logging in. Please try again.'
    )
    setShowStatusModal(true)
  }

  const handleAuthSuccess = () => {
    console.log('Authentication successful')
    setCurrentUser(true)
    showSuccessModal()
  }

  const handleAuthError = () => {
    console.log('Authentication erro')
    setCurrentUser(false)
    showErrorModal()
  }

  return (
    <header className="w-full h-[100px] border-b border-primary/30 bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[108px] h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg
            className="w-14 h-[63px]"
            viewBox="0 0 56 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.1641 30.2087C22.8664 30.2087 22.6251 30.45 22.6251 30.7477C22.6251 31.0454 22.8664 31.2866 23.1641 31.2866V30.2087ZM23.1641 31.2866H36.4028V30.2087H23.1641V31.2866ZM37.804 29.8854V17.3735H36.7261V29.8854H37.804ZM36.4028 31.2866C37.1767 31.2866 37.804 30.6593 37.804 29.8854H36.7261C36.7261 30.064 36.5814 30.2087 36.4028 30.2087V31.2866Z"
              fill="#0C68F4"
            />
            <path
              d="M18.6738 36.0049C18.3762 36.0049 18.1349 36.2462 18.1349 36.5439C18.1349 36.8415 18.3762 37.0828 18.6738 37.0828V36.0049ZM18.6738 37.0828H50.3747V36.0049H18.6738V37.0828ZM51.7759 35.6815V30.729H50.6981V35.6815H51.7759ZM50.3747 37.0828C51.1486 37.0828 51.7759 36.4554 51.7759 35.6815H50.6981C50.6981 35.8601 50.5533 36.0049 50.3747 36.0049V37.0828Z"
              fill="#0C68F4"
            />
            <path
              d="M17.8457 41.6542C17.548 41.6542 17.3068 41.8955 17.3068 42.1931C17.3068 42.4908 17.548 42.7321 17.8457 42.7321V41.6542ZM17.8457 42.7321H49.8274V41.6542H17.8457V42.7321Z"
              fill="#0C68F4"
            />
            <circle cx="37.5" cy="14.5" r="3" fill="#F45E0C" />
            <circle cx="51.5" cy="27.5" r="3" fill="#F45E0C" />
            <circle cx="52.5" cy="42" r="3" fill="#F45E0C" />
            <circle cx="46.5" cy="55" r="3" fill="#F45E0C" />
            <path
              d="M31.4095 58.1486H4.25688C2.82814 58.1486 1.66992 56.9904 1.66992 55.5616V20.5458C1.66992 19.6727 2.11029 18.8586 2.84097 18.3807L26.1716 3.123C26.9791 2.59494 28.0133 2.56009 28.8545 3.0326L44.9476 12.0726"
              stroke="#0C68F4"
              strokeWidth="1.72464"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            to="/"
            className="text-lg font-light text-brand-black hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-lg font-light text-brand-black hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            to="/blog"
            className="text-lg font-light text-brand-black hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/faq"
            className="text-lg font-light text-brand-black hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className="text-lg font-light text-brand-black hover:text-primary transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-6 h-6 text-brand-black" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingBag className="w-6 h-6 text-brand-black" />
          </button>
          {currentUser ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'profile',
                    label: (
                      <Link to="/account/profile">
                        <div className="inline-flex items-center gap-2">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.1205 13.53C12.1005 13.53 12.0705 13.53 12.0505 13.53C12.0205 13.53 11.9805 13.53 11.9505 13.53C9.68047 13.46 7.98047 11.69 7.98047 9.50998C7.98047 7.28998 9.79047 5.47998 12.0105 5.47998C14.2305 5.47998 16.0405 7.28998 16.0405 9.50998C16.0305 11.7 14.3205 13.46 12.1505 13.53C12.1305 13.53 12.1305 13.53 12.1205 13.53ZM12.0005 6.96998C10.6005 6.96998 9.47047 8.10998 9.47047 9.49998C9.47047 10.87 10.5405 11.98 11.9005 12.03C11.9305 12.02 12.0305 12.02 12.1305 12.03C13.4705 11.96 14.5205 10.86 14.5305 9.49998C14.5305 8.10998 13.4005 6.96998 12.0005 6.96998Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M11.9998 22.7501C9.30984 22.7501 6.73984 21.7501 4.74984 19.9301C4.56984 19.7701 4.48984 19.5301 4.50984 19.3001C4.63984 18.1101 5.37984 17.0001 6.60984 16.1801C9.58984 14.2001 14.4198 14.2001 17.3898 16.1801C18.6198 17.0101 19.3598 18.1101 19.4898 19.3001C19.5198 19.5401 19.4298 19.7701 19.2498 19.9301C17.2598 21.7501 14.6898 22.7501 11.9998 22.7501ZM6.07984 19.1001C7.73984 20.4901 9.82984 21.2501 11.9998 21.2501C14.1698 21.2501 16.2598 20.4901 17.9198 19.1001C17.7398 18.4901 17.2598 17.9001 16.5498 17.4201C14.0898 15.7801 9.91984 15.7801 7.43984 17.4201C6.72984 17.9001 6.25984 18.4901 6.07984 19.1001Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                                fill="#0C0C0C"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-normal text-xl">
                              {user?.name}
                            </div>
                            <div className="font-light text-sm text-gray-500">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  },
                  {
                    key: 'orders',
                    label: (
                      <Link to="/account/orders">
                        <div className="inline-flex items-center gap-2">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5 8.63005C16.09 8.63005 15.75 8.29005 15.75 7.88005V6.50005C15.75 5.45005 15.3 4.43005 14.52 3.72005C13.73 3.00005 12.71 2.67005 11.63 2.77005C9.83 2.94005 8.25 4.78005 8.25 6.70005V7.67005C8.25 8.08005 7.91 8.42005 7.5 8.42005C7.09 8.42005 6.75 8.08005 6.75 7.67005V6.69005C6.75 4.00005 8.92 1.52005 11.49 1.27005C12.99 1.13005 14.43 1.60005 15.53 2.61005C16.62 3.60005 17.25 5.02005 17.25 6.50005V7.88005C17.25 8.29005 16.91 8.63005 16.5 8.63005Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M14.9998 22.75H8.99982C4.37982 22.75 3.51982 20.6 3.29982 18.51L2.54982 12.52C2.43982 11.44 2.39982 9.89 3.44982 8.73C4.34982 7.73 5.83982 7.25 7.99982 7.25H15.9998C18.1698 7.25 19.6598 7.74 20.5498 8.73C21.5898 9.89 21.5598 11.44 21.4498 12.5L20.6998 18.51C20.4798 20.6 19.6198 22.75 14.9998 22.75ZM7.99982 8.75C6.30982 8.75 5.14982 9.08 4.55982 9.74C4.06982 10.28 3.90982 11.11 4.03982 12.35L4.78982 18.34C4.95982 19.94 5.39982 21.26 8.99982 21.26H14.9998C18.5998 21.26 19.0398 19.95 19.2098 18.36L19.9598 12.35C20.0898 11.13 19.9298 10.3 19.4398 9.75C18.8498 9.08 17.6898 8.75 15.9998 8.75H7.99982Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M15.4202 13.1499C14.8602 13.1499 14.4102 12.6999 14.4102 12.1499C14.4102 11.5999 14.8602 11.1499 15.4102 11.1499C15.9602 11.1499 16.4102 11.5999 16.4102 12.1499C16.4102 12.6999 15.9702 13.1499 15.4202 13.1499Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M8.42016 13.1499C7.86016 13.1499 7.41016 12.6999 7.41016 12.1499C7.41016 11.5999 7.86016 11.1499 8.41016 11.1499C8.96016 11.1499 9.41016 11.5999 9.41016 12.1499C9.41016 12.6999 8.97016 13.1499 8.42016 13.1499Z"
                                fill="#0C0C0C"
                              />
                            </svg>
                          </div>
                          <div>My Orders</div>
                        </div>
                      </Link>
                    )
                  },
                  {
                    key: 'wishlist',
                    label: (
                      <Link to="/account/wishlist">
                        <div className="inline-flex items-center gap-2">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 21.6501C11.69 21.6501 11.39 21.6101 11.14 21.5201C7.32 20.2101 1.25 15.5601 1.25 8.6901C1.25 5.1901 4.08 2.3501 7.56 2.3501C9.25 2.3501 10.83 3.0101 12 4.1901C13.17 3.0101 14.75 2.3501 16.44 2.3501C19.92 2.3501 22.75 5.2001 22.75 8.6901C22.75 15.5701 16.68 20.2101 12.86 21.5201C12.61 21.6101 12.31 21.6501 12 21.6501ZM7.56 3.8501C4.91 3.8501 2.75 6.0201 2.75 8.6901C2.75 15.5201 9.32 19.3201 11.63 20.1101C11.81 20.1701 12.2 20.1701 12.38 20.1101C14.68 19.3201 21.26 15.5301 21.26 8.6901C21.26 6.0201 19.1 3.8501 16.45 3.8501C14.93 3.8501 13.52 4.5601 12.61 5.7901C12.33 6.1701 11.69 6.1701 11.41 5.7901C10.48 4.5501 9.08 3.8501 7.56 3.8501Z"
                                fill="#0C0C0C"
                              />
                            </svg>
                          </div>
                          <div>My Wishlist</div>
                        </div>
                      </Link>
                    )
                  },
                  {
                    key: 'logout',
                    label: (
                      <button
                        onClick={() => {
                          setCurrentUser(false)
                          alert('Logged out')
                        }}
                      >
                        <div className="inline-flex items-center gap-2">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.2395 22.27H15.1095C10.6695 22.27 8.52953 20.52 8.15953 16.6C8.11953 16.19 8.41953 15.82 8.83953 15.78C9.23953 15.74 9.61953 16.05 9.65953 16.46C9.94953 19.6 11.4295 20.77 15.1195 20.77H15.2495C19.3195 20.77 20.7595 19.33 20.7595 15.26V8.73998C20.7595 4.66998 19.3195 3.22998 15.2495 3.22998H15.1195C11.4095 3.22998 9.92953 4.41998 9.65953 7.61998C9.60953 8.02998 9.25953 8.33998 8.83953 8.29998C8.41953 8.26998 8.11953 7.89998 8.14953 7.48998C8.48953 3.50998 10.6395 1.72998 15.1095 1.72998H15.2395C20.1495 1.72998 22.2495 3.82998 22.2495 8.73998V15.26C22.2495 20.17 20.1495 22.27 15.2395 22.27Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M15.0001 12.75H3.62012C3.21012 12.75 2.87012 12.41 2.87012 12C2.87012 11.59 3.21012 11.25 3.62012 11.25H15.0001C15.4101 11.25 15.7501 11.59 15.7501 12C15.7501 12.41 15.4101 12.75 15.0001 12.75Z"
                                fill="#0C0C0C"
                              />
                              <path
                                d="M5.85043 16.1001C5.66043 16.1001 5.47043 16.0301 5.32043 15.8801L1.97043 12.5301C1.68043 12.2401 1.68043 11.7601 1.97043 11.4701L5.32043 8.12009C5.61043 7.83009 6.09043 7.83009 6.38043 8.12009C6.67043 8.41009 6.67043 8.89009 6.38043 9.18009L3.56043 12.0001L6.38043 14.8201C6.67043 15.1101 6.67043 15.5901 6.38043 15.8801C6.24043 16.0301 6.04043 16.1001 5.85043 16.1001Z"
                                fill="#0C0C0C"
                              />
                            </svg>
                          </div>
                          <div>Log out</div>
                        </div>
                      </button>
                    )
                  }
                ]
              }}
            >
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-6 h-6 text-brand-black" />
              </button>
            </Dropdown>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="px-4 py-3 bg-primary hover:bg-primary/90 text-white text-base rounded-lg"
            >
              Login / Sign Up
            </button>
          )}
        </div>
        <Login
          open={openAuth}
          onClose={() => setOpenAuth(false)}
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          onForgotPassword={() => alert('Forgot password clicked')}
          onLoginWithGoogle={() => alert('Google OAuth')}
          onLoginWithFacebook={() => alert('Facebook OAuth')}
          brand="Tech Heim"
        />
        <StatusModal
          open={showStatusModal}
          type={statusModalType}
          message={statusModalMessage}
          description={statusModalDescription}
          onClose={() => setShowStatusModal(false)}
        />
      </div>
    </header>
  )
}
