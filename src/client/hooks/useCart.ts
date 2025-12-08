import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchCart,
  addToCart as addToCartSvc,
  updateCartQuantity as updateQtySvc,
  removeCartItem as removeItemSvc,
  clearCart as clearCartSvc,
  type AddToCartPayload
} from '../services/cartService'
import type { Cart } from '../types/cart'

export const useCart = () => {
  const hasToken = !!localStorage.getItem('accessToken')
  
  return useQuery<{ cart: Cart }>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: hasToken, // Only fetch if token exists
    staleTime: 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}

export const useAddToCart = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, payload }: { productId: number; payload: AddToCartPayload }) =>
      addToCartSvc(productId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}

export const useUpdateCartQuantity = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      updateQtySvc(productId, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })
}

export const useRemoveCartItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (productId: number) => removeItemSvc(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })
}

export const useClearCart = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => clearCartSvc(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })
}
