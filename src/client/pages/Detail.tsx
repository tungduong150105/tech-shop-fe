import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/products/ProductDetail'
import { useProductById } from '../hooks/useProducts'
import { ProductDetailSkeleton } from '../components/common/LoadingSkeleton'

const Detail = () => {
  const { id } = useParams<{ id: string }>()
  const productId = id ? parseInt(id) : NaN

  const { data: product, isLoading, error } = useProductById(productId)

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return <div>Error loading product details.</div>
  }

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )
}

export default Detail
