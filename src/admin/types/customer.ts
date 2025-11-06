import { Pagination } from './common'

export type AdminCustomer = {
  id: number
  name?: string
  email?: string
  role?: string
  phone?: string
  address?: string
  created_at?: string
}

export type CustomerListResponse = {
  users: AdminCustomer[]
  pagination: Pagination & { total_pages?: number }
}

export type CustomerResponse = AdminCustomer

export type UpdateCustomerRequest = Partial<{
  name: string
  role: string
  phone: string
  address: string
}>


