import axiosClient from '../../lib/axios'
import {
  AdminReview,
  CreateReviewRequest,
  ListProductReviewsResponse,
  ReviewMutationResponse
} from '../types'

export const adminReviewService = {
  list(product_id: number, params?: { page?: number; limit?: number }) {
    return axiosClient.get<ListProductReviewsResponse>(
      `/products/${product_id}/reviews`,
      { params }
    )
  },
  create(product_id: number, payload: CreateReviewRequest) {
    return axiosClient.post<ReviewMutationResponse>(
      `/products/${product_id}/reviews`,
      payload
    )
  },
  update(product_id: number, id: number, payload: CreateReviewRequest) {
    return axiosClient.patch<ReviewMutationResponse>(
      `/products/${product_id}/reviews/${id}`,
      payload
    )
  },
  delete(id: number) {
    return axiosClient.delete(`/reviews/${id}`)
  }
}

export default adminReviewService
