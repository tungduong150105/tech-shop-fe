import type { ListProductRes, ProductRes, Product } from '../types/product'
import type { ReviewRes } from '../types/review'

const API_BASE_URL = 'http://localhost:3000/api/v1/products'

export const fetchNewProducts = async (): Promise<ListProductRes> => {
  const response = await fetch(`${API_BASE_URL}?sort=newest&page=1&limit=40`)
  if (!response.ok) {
    throw new Error('Failed to fetch new products')
  }
  return response.json()
}

export const fetchPopularProducts = async (): Promise<ListProductRes> => {
  const response = await fetch(`${API_BASE_URL}?sort=popular&page=1&limit=40`)
  if (!response.ok) {
    throw new Error('Failed to fetch new products')
  }
  return response.json()
}

export const fetchCollectionProducts = async (
  category_id: string,
  sort: string,
  filter: string,
  page: number,
  limit: number
): Promise<ListProductRes> => {
  if (filter.length > 0) {
    filter = '&' + filter
  }
  if (category_id !== 'all') {
    category_id = `&category_id=${category_id}`
  } else {
    category_id = ''
  }
  const response = await fetch(
    `${API_BASE_URL}?sort=${sort}&page=${page}&limit=${limit}${filter}${category_id}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch all products')
  }
  return response.json()
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product details')
  }
  return response.json()
}

export const fetchSimilarProducts = async (
  id: number
): Promise<ListProductRes> => {
  const response = await fetch(`${API_BASE_URL}?category_id=${id}&page=1&limit=15`)
  if (!response.ok) {
    throw new Error('Failed to fetch similar products')
  }
  return response.json()
}

export const fetchReview = async (product_id: number): Promise<ReviewRes> => {
  const response = await fetch(`http://localhost:3000/api/v1/products/${product_id}/reviews`)
  console.log("Fetching reviews for product ID:", response.json);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews of products')
  }
  return response.json()
}
