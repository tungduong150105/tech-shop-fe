// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { useUpdateProfile, useValidateToken } from '../hooks/useUser';

interface UserContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  refetchUser: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, isLoading: isFetching, refetch: fetchCurrentUser } = useValidateToken();
  const updateUserMutation = useUpdateProfile();

  useEffect(() => {
    if (data) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data, isFetching]);

  const updateUser = (userData: Partial<User>) => {
    console.log('Updating user with data:', userData);
    setUser(prev => prev ? { ...prev, ...userData } : null);
    updateUserMutation.mutate(userData);
  };

  const refetchUser = async () => {
    await fetchCurrentUser();
  };

  return (
    <UserContext.Provider value={{ user, updateUser, refetchUser, isLoading: isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};