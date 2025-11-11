export type ProductSpecMeta = {
  key: string
  label: string
  options: string[]
}

export type FilterMetadataResponse = ProductSpecMeta[]

export type FilterOption = {
  id: string
  key: string
  label: string
  value: string
  category_id: string | null
  category?: {
    id: string
    name: string
  } | null
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type FilterOptionListResponse = FilterOption[]

export type FilterOptionResponse = {
  success: boolean
  data: FilterOption
}

export type FilterOptionListResponseWithSuccess = {
  success: boolean
  data: FilterOption[]
}

export type CreateFilterOptionRequest = {
  key: string
  label: string
  value: string
  category_id?: number | null
  order?: number
  is_active?: boolean
}

export type UpdateFilterOptionRequest = {
  key?: string
  label?: string
  value?: string
  category_id?: number | null
  order?: number
  is_active?: boolean
}