import { useAuthStatus } from './useAuthStatus'
import { useLogin } from './useLogin'

export const useAuth = () => {
  const loginMutation = useLogin()
  const authStatus = useAuthStatus()

  return {
    login: loginMutation.mutate,
    logininAsync: loginMutation.mutateAsync,

    isLoggingIn: loginMutation.isPending,
    isLoading: authStatus.isLoading,

    user: authStatus.data?.user,
    isAuthenticated: !!authStatus.data && !authStatus.error,

    authError: authStatus.error,
    loginError: loginMutation.error,

    isLoginSuccess: loginMutation.isSuccess,

    loginData: loginMutation.data,
  }
}
