import axiosClient from '../lib/axios'
import type { Cart } from '../types/cart'

interface CartResponse {
  cart: Cart
}

export const fetchCart = async (): Promise<CartResponse> => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    throw new Error('No access token')
  }
  const { data } = await axiosClient.get<CartResponse>('/cart')
  return data
}

export type AddToCartPayload = {
  quantity?: number
  color?: string | { name: string; code: string } | null
}

export const addToCart = async (
  productId: number,
  payload: AddToCartPayload
): Promise<any> => {
  const { data } = await axiosClient.post(`/cart/add_item/${productId}`, payload)
  return data
}

export const updateCartQuantity = async (
  productId: number,
  quantity: number
): Promise<any> => {
  const { data } = await axiosClient.put(`/cart/update_item/${productId}`, {
    quantity
  })
  return data
}

export const removeCartItem = async (productId: number): Promise<any> => {
  const { data } = await axiosClient.delete(`/cart/remove_item/${productId}`)
  return data
}

export const clearCart = async (): Promise<any> => {
  const { data } = await axiosClient.delete('/cart/clear')
  return data
}
