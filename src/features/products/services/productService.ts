import axiosClient from '@/lib/axios'
import type { Product } from '../types/product'
import type { ProductResponse, ProductsResponse } from '@/shared/types/api'

export const fetchNewProducts = async (page: number, limit: number): Promise<ProductsResponse> => {
  const { data } = await axiosClient.get<ProductsResponse>('/products', {
    params: { sort: 'newest', page: page, limit: limit }
  })
  return data
}

export const fetchPopularProducts = async (page: number, limit: number): Promise<ProductsResponse> => {
  const { data } = await axiosClient.get<ProductsResponse>('/products', {
    params: { sort: 'popular', page: page, limit: limit }
  })
  return data
}

export const fetchAllProducts = async (
  category_id: string,
  sort: string,
  filter: string,
  page: number,
  limit: number
): Promise<ProductsResponse> => {
  const params: Record<string, unknown> = { sort, page, limit }
  if (filter) {
    // filter string may look like "key=value&key2=value2"
    new URLSearchParams(filter).forEach((v, k) => (params[k] = v))
  }
  if (category_id !== 'all') params.category_id = category_id
  const { data } = await axiosClient.get<ProductsResponse>('/products', {
    params
  })
  return data
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axiosClient.get<Product>(`/products/${id}`)
  return data
}

export const fetchProductsByCategory = async (
  categoryId: number,
  page: number,
  limit: number
): Promise<ProductsResponse> => {
  const { data } = await axiosClient.get<ProductsResponse>('/products', {
    params: { category_id: categoryId, page: page, limit: limit }
  })
  return data
}

// export const fetchReview = async (product_id: number): Promise<ReviewRes> => {
//   const { data } = await axiosClient.get<ReviewRes>(
//     `/products/${product_id}/reviews`
//   )
//   return data
// }

export const searchProducts = async (
  query: string
): Promise<ProductsResponse> => {
  const { data } = await axiosClient.get<ProductsResponse>('/products/search', {
    params: { query }
  })
  return data
}
