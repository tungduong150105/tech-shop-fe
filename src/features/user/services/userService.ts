import axiosClient from '@/lib/axios'
import { User } from '../types/user'

export const validateToken = async (): Promise<{ user: User }> => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    throw new Error('No access token')
  }
  const { data } = await axiosClient.get<{ success: boolean; data: User }>(
    '/auth/me'
  )
  // Backend returns: { success: true, data: { id, name, email, role, phone, ... } }
  if (data.success && data.data) {
    return { user: data.data }
  } else if ((data as any).user) {
    return { user: (data as any).user }
  }
  throw new Error('Invalid response format')
}

export type UpdateProfileReq = {
  user? : Partial<User>
} & Partial<User>

export const updateProfile = async (payload: UpdateProfileReq) => {
  const { data } = await axiosClient.patch('/auth/update_profile', payload)
  return data
}

export const changePassword = async (payload: {
  current_password: string
  new_password: string
}) => {
  const { data } = await axiosClient.post('/auth/change_password', payload)
  return data
}
