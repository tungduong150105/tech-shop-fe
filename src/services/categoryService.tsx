import axiosClient from '../lib/axios'
import type { Categories } from '../types/category'

export const fetchCategories = async (): Promise<Categories> => {
  const { data } = await axiosClient.get<Categories>('/categories')
  return data
}

export const fetchCategoryById = async (id: number): Promise<any> => {
  const { data } = await axiosClient.get(`/categories/${id}`)
  return data
}

export const fetchSubCategoriesByCategory = async (
  categoryId: number
): Promise<any> => {
  const { data } = await axiosClient.get(
    `/categories/${categoryId}/sub-categories`
  )
  return data
}
