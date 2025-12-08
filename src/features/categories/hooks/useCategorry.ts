import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchCategoryById } from '../services/categoryService'

import type { Categories } from '../types/category'

export const useCategories = () =>
  useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000
  })

export const useCategoryById = (id: number) =>
  useQuery<any>({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })