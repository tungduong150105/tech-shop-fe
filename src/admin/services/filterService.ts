import axiosClient from '../../lib/axios'
import { FilterMetadataResponse } from '../types'

export const adminFilterService = {
  get(category_id?: number) {
    return axiosClient.get<FilterMetadataResponse>('/filter', {
      params: { category_id }
    })
  }
}

export default adminFilterService
