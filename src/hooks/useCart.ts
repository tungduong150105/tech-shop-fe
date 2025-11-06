import { useQuery } from '@tanstack/react-query';
import { fetchCart } from '../services/cartService';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 10 * 60 * 1000,
  })
};
