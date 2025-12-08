import { useQuery } from '@tanstack/react-query'
import {
  fetchNewProducts,
  fetchPopularProducts,
  fetchAllProducts,
  fetchProductsByCategory,
  searchProducts,
  fetchProductById
} from '../services/productService'

import type {Product} from '../types/product'
import type { ProductsResponse } from '@/shared/types/api'
import { ProductResponse } from '@/admin/types'

export const useNewProducts = (page: number, limit: number) =>
  useQuery<ProductsResponse>({
    queryKey: ['newProducts', page, limit],
    queryFn: () => fetchNewProducts(page, limit),
    staleTime: 5 * 60 * 1000
  })

export const usePopularProducts = (page: number, limit: number) =>
  useQuery<ProductsResponse>({
    queryKey: ['popularProducts', page, limit],
    queryFn: () => fetchPopularProducts(page, limit),
    staleTime: 5 * 60 * 1000
  })

export const useAllProducts = (
  category_id: string,
  sort: string,
  filter: string,
  page: number,
  limit: number
) =>
  useQuery<ProductsResponse>({
    queryKey: ['collectionProducts', category_id, sort, filter, page, limit],
    queryFn: () => fetchAllProducts(category_id, sort, filter, page, limit),
    staleTime: 5 * 60 * 1000
  })

export const useProductById = (productId: number) =>
  useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000
  })

export const useSimilarProducts = (
  categoryId: number,
  page: number,
  limit: number
) =>
  useQuery<ProductsResponse>({
    queryKey: ['similarProducts', categoryId, page, limit],
    queryFn: () => fetchProductsByCategory(categoryId, page, limit),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  })

export const useSearchProducts = (query: string) =>
  useQuery<ProductsResponse>({
    queryKey: ['searchProducts', query],
    queryFn: () => searchProducts(query),
    enabled: !!query?.trim(),
    staleTime: 60 * 1000
  })
