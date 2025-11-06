import { useQuery } from '@tanstack/react-query'
import adminFilterService from '../services/filterService'
import { FilterMetadataResponse } from '../types'

const filterKeys = {
  all: ['admin', 'filters'] as const,
  byCategory: (category_id?: number) =>
    [...filterKeys.all, category_id] as const
}

export function useAdminFilters(category_id?: number) {
  return useQuery<{ data: FilterMetadataResponse }, Error>({
    queryKey: filterKeys.byCategory(category_id),
    queryFn: () => adminFilterService.get(category_id)
  })
}
