import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, Key, Home, MapPin, Edit2, X } from 'lucide-react'
import { useValidateToken, useUpdateProfile } from '../../hooks/useAuth'
import { toast } from 'sonner'

type ModalProps = {
  title: string
  onClose: () => void
  firstName: string
  lastName: string
  onFirstNameChange: (value: string) => void
  onLastNameChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

function Modal({
  title,
  onClose,
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onSubmit,
  isLoading = false
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-blue-600 mb-2 ml-3">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={e => onFirstNameChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:border-blue-600"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="block text-xs text-blue-600 mb-2 ml-3">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={e => onLastNameChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:border-blue-600"
              placeholder="Last name"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  const { data: userData, isLoading } = useValidateToken()
  const updateProfile = useUpdateProfile()

  const [showModal, setShowModal] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')

  // Initialize from user data
  useEffect(() => {
    if (userData?.user) {
      const nameParts = (userData.user.name || '').split(' ')
      setFirstName(nameParts[0] || '')
      setLastName(nameParts.slice(1).join(' ') || '')
      setFullName(userData.user.name || '')
      setEmail(userData.user.email || '')
      setPhone(userData.user.phone || '')
      setAddress(userData.user.address || '')
    }
  }, [userData])

  const handleSaveName = async () => {
    const newFullName = `${firstName} ${lastName}`.trim()
    if (!newFullName) {
      toast.error('Name cannot be empty')
      return
    }

    try {
      await updateProfile.mutateAsync({ name: newFullName })
      setFullName(newFullName)
      setShowModal(false)
      toast.success('Name updated successfully')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update name')
    }
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!userData?.user) {
    return <div className="p-8">Please log in to view your profile</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Identification
          </h1>
          <p className="text-gray-500">Verify your identity</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Full name and Email row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Full name */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Full name
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{fullName}</span>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                E-mail Address
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{email}</span>
                </div>
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Phone number and Password row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Phone number */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Phone number
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{phone}</span>
                </div>
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">*********</span>
                </div>
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Address and Postal code row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Address */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Address
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{address}</span>
                </div>
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Postal code */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Postal code
              </label>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Postal code</span>
                </div>
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title="Edit Full Name"
          onClose={() => setShowModal(false)}
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onSubmit={handleSaveName}
          isLoading={updateProfile.isPending}
        />
      )}
    </div>
  )
}
