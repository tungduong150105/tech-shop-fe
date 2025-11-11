import type { AuthReq, AuthRes, AuthUser } from '../types/auth'
import axiosClient from '../lib/axios'

export const login = async (payload: AuthReq): Promise<AuthRes> => {
  const { data } = await axiosClient.post<AuthRes>('/auth/login', payload)
  // store token if returned
  if (data?.data?.accessToken) {
    localStorage.setItem('accessToken', data.data.accessToken)
  }
  return data
}

export const validateToken = async (): Promise<{ user: AuthUser }> => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    throw new Error('No access token')
  }
  const { data } = await axiosClient.get<{ success: boolean; data: AuthUser }>(
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

// Additional endpoints present in backend
export type RegisterReq = { name: string; email: string; password: string }
export const register = async (payload: RegisterReq) => {
  const { data } = await axiosClient.post('/auth/register', payload)
  if ((data as any)?.data?.accessToken) {
    localStorage.setItem('accessToken', (data as any).data.accessToken)
  }
  return data
}

export const logout = async () => {
  const { data } = await axiosClient.post('/auth/logout')
  localStorage.removeItem('accessToken')
  return data
}

export const refreshAccessToken = async () => {
  const { data } = await axiosClient.post('/auth/refresh-token')
  if ((data as any)?.data?.accessToken) {
    localStorage.setItem('accessToken', (data as any).data.accessToken)
  }
  return data
}

export type UpdateProfileReq = {
  user?: { name?: string; phone?: string; address?: string }
  name?: string
  phone?: string
  address?: string
}
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
