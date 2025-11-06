import { useQuery } from '@tanstack/react-query'
import {
  fetchNewProducts,
  fetchPopularProducts,
  fetchCollectionProducts,
  fetchProductById,
  fetchSimilarProducts,
  fetchReview,
  searchProducts,
  fetchProductsByCategory
} from '../services/productService'
import type { ListProductRes, Product } from '../types/product'
import type { ReviewRes } from '../types/review'

export const useNewProducts = () =>
  useQuery<ListProductRes>({
    queryKey: ['newProducts'],
    queryFn: fetchNewProducts,
    staleTime: 5 * 60 * 1000
  })

export const usePopularProducts = () =>
  useQuery<ListProductRes>({
    queryKey: ['popularProducts'],
    queryFn: fetchPopularProducts,
    staleTime: 5 * 60 * 1000
  })

export const useCollectionProducts = (
  category_id: string,
  sort: string,
  filter: string,
  page: number,
  limit: number
) =>
  useQuery<ListProductRes>({
    queryKey: ['collectionProducts', category_id, sort, filter, page, limit],
    queryFn: () => fetchCollectionProducts(category_id, sort, filter, page, limit),
    staleTime: 5 * 60 * 1000
  })

export const useProductById = (productId: number) =>
  useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000
  })

export const useSimilarProducts = (categoryId: number) =>
  useQuery<ListProductRes>({
    queryKey: ['similarProducts', categoryId],
    queryFn: () => fetchSimilarProducts(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  })

export const useProductReviews = (productId: number) =>
  useQuery<ReviewRes>({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReview(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000
  })

export const useSearchProducts = (query: string) =>
  useQuery<ListProductRes>({
    queryKey: ['searchProducts', query],
    queryFn: () => searchProducts(query),
    enabled: !!query?.trim(),
    staleTime: 60 * 1000
  })

export const useProductsByCategory = (categoryId: number) =>
  useQuery<ListProductRes>({
    queryKey: ['productsByCategory', categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  })
