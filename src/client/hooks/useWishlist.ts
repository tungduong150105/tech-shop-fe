import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  type WishlistResponse
} from '../services/wishlistService'

export const useWishlist = () => {
  return useQuery<WishlistResponse, Error>({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useAddToWishlist = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (productId: number) => addToWishlist(productId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wishlist'] })
    }
  })
}

export const useRemoveFromWishlist = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wishlist'] })
    }
  })
}

export const useClearWishlist = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wishlist'] })
    }
  })
}

