import { login } from '../services/authService'
import { AuthRes } from '../types/auth'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (data: AuthRes) => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData(['auth', 'user'], data.user)
      queryClient.setQueryData(['auth', 'token'], data.token)
      queryClient.setQueryData(['auth', 'status'], data)
    },
    onError: (error: Error) => {
      localStorage.removeItem('token')
      queryClient.setQueryData(['auth', 'user'], null)
      queryClient.setQueryData(['auth', 'token'], null)
      queryClient.setQueryData(['auth', 'status'], null)
    }
  })
}
