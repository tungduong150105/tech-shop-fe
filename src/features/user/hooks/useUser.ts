import { User } from "../types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { validateToken, updateProfile, changePassword } from "../services/userService"

export const useValidateToken = () => {
  const hasToken = !!localStorage.getItem('accessToken')

  return useQuery<{ user: User }, Error>({
    queryKey: ['me'],
    queryFn: validateToken,
    enabled: hasToken, // Only fetch if token exists
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}

export type UpdateProfileReq = {
  user?: { name?: string; phone?: string; address?: string }
  name?: string
  phone?: string
  address?: string
}

export const useUpdateProfile = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] })
    }
  })
}

export const useChangePassword = () =>
  useMutation({ mutationFn: changePassword })