import { ProductCard } from './ProductCard'
import { ArrowRight } from 'lucide-react'

import type { Product } from '../types/product'

interface ListProductProps {
  title?: string
  products?: Product[]
}

export function ListProduct({ title, products }: ListProductProps) {
  if (products == null || products.length === 0) {
    return null
  }

  console.log('products in ProductList:', products)

  const data = products?.slice(0, 4)

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-[32px] font-medium text-brand-black">
          {title}
        </h2>
        <button className="flex items-center gap-2 text-brand-black hover:text-primary transition-colors">
          <span className="text-base">View all</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <div className="h-0.5 w-full bg-[#B4B4B4] mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  )
}
