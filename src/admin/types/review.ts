import { Pagination, SuccessResponse } from './common'

export type AdminReview = {
  id: number
  user_id: number
  product_id: number
  rating: number
  comment?: string
  created_at?: string
  updated_at?: string
  user?: {
    id: number
    name: string
  }
}

export type ReviewSummary = {
  average_rating: number
  total_reviews: number
}

export type ListProductReviewsResponse = {
  reviews: AdminReview[]
  pagination: Pagination
  summary: ReviewSummary
}

export type CreateReviewRequest = {
  review: {
    rating: number
    comment?: string
  }
}

export type ReviewMutationResponse = SuccessResponse<{
  message: string
  review: AdminReview
  product_summary: ReviewSummary
}>
