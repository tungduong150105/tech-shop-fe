import { useQuery } from '@tanstack/react-query';
import { validateToken } from '../services/authService';

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: validateToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: () => {
      // Check if we have a token but haven't validated yet
      const token = localStorage.getItem('token');
      return token ? undefined : null;
    },
  });
};
