import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000/api/v1';

export const useAuthCheck = () => {
  return useQuery({
    queryKey: ['auth', 'status'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      console.log('Auth token:', token);
      
      if (!token) {
        console.log('No token found');
        throw new Error('Not authenticated');
      }

      // Optional: Validate token with server
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log('Auth check failed with status:', response.status);
        throw new Error('Invalid token');
      }
      
      console.log('Auth check response status:', response.status);

      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// // Usage
// const { data: user, isLoading, isError } = useAuthCheck();
// const isLoggedIn = !isError && !isLoading && !!user;
