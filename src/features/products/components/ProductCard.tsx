import { Star } from 'lucide-react'
import type { Product } from '../types/product'
import { useNavigate } from 'react-router-dom'

interface ProductCartProps {
  product: Product
}

export function ProductCard({ product }: ProductCartProps) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="relative flex flex-col gap-4 p-4 rounded-lg bg-white transition-shadow shadow-[0_2px_15px_-1px_rgba(113,113,113,0.12)] hover:shadow-[0_2px_20px_-1px_rgba(113,113,113,0.20)]"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-0 px-2 py-1 bg-secondary-100 rounded-r-lg z-10">
          <span className="text-xs font-light text-secondary">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-[190px] flex items-center justify-center">
        <img
          src={product.img[0]}
          alt={product.name}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[rgba(68,68,68,0.1)] via-[rgba(16,16,16,0.7)] to-[rgba(68,68,68,0.1)]" />

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-light leading-6 overflow-hidden text-ellipsis whitespace-nowrap text-brand-black">
          {product.name}
        </h3>

        <div className="flex items-end justify-between">
          {/* Price */}
          <div className="flex flex-col">
            <span
              className={`text-xs text-neutral-gray-71 line-through ${
                product.discount > 0 ? '' : 'invisible'
              }`}
            >
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg font-light text-brand-black">
              ${product.final_price.toFixed(2)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-0.5">
            <Star className="w-[18px] h-[18px] fill-primary-500 text-primary-500" />
            <span className="text-base font-medium text-primary-500">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
