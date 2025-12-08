export type Pagination = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

// export type ApiResponse<T> = {
//   data: T
//   pagination: Pagination
// }

import type { ProductType } from '@/features/products'

export type ProductsResponse = {
  products: ProductType[]
  pagination: Pagination
}

export type ProductResponse = {
  product: ProductType
  pagination: Pagination
}
