import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/categoryService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
};
