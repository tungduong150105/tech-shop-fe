import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchCategoryById, fetchSubCategoriesByCategory } from '../services/categoryService'
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

export const useSubCategoriesByCategory = (categoryId: number) =>
  useQuery<any>({
    queryKey: ['subCategoriesOfCategory', categoryId],
    queryFn: () => fetchSubCategoriesByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  })
