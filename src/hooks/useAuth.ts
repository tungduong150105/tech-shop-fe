import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  login as loginSvc,
  register as registerSvc,
  logout as logoutSvc,
  validateToken as meSvc,
  updateProfile as updateProfileSvc,
  changePassword as changePasswordSvc,
  type RegisterReq
} from '../services/authService'
import type { AuthReq, AuthRes, AuthUser } from '../types/auth'

export const useLogin = () =>
  useMutation<AuthRes, Error, AuthReq>({
    mutationFn: payload => loginSvc(payload)
  })

export const useRegister = () =>
  useMutation<any, Error, RegisterReq>({
    mutationFn: payload => registerSvc(payload)
  })

export const useValidateToken = () => {
  const hasToken = !!localStorage.getItem('accessToken')

  return useQuery<{ user: AuthUser }, Error>({
    queryKey: ['me'],
    queryFn: meSvc,
    enabled: hasToken, // Only fetch if token exists
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}

export const useLogout = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => logoutSvc(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['me'] })
    }
  })
}

export const useUpdateProfile = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateProfileSvc,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] })
    }
  })
}

export const useChangePassword = () =>
  useMutation({ mutationFn: changePasswordSvc })
