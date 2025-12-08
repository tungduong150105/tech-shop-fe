import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  login as loginSvc,
  register as registerSvc,
  logout as logoutSvc,
  type RegisterReq
} from '../services/authService'
import type { AuthReq, AuthRes } from '../types/auth'

export const useLogin = () =>
  useMutation<AuthRes, Error, AuthReq>({
    mutationFn: payload => loginSvc(payload)
  })

export const useRegister = () =>
  useMutation<any, Error, RegisterReq>({
    mutationFn: payload => registerSvc(payload)
  })

export const useLogout = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => logoutSvc(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['me'] })
    }
  })
}
