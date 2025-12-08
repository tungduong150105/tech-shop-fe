import { Truck, ShieldCheck, Store, Minus, Plus, Trash2 } from 'lucide-react'

import { Item } from '../types/order'
import { useEffect, useState } from 'react'

interface OrderProductCardProps {
  product: Item
}

export default function OrderProductCard({ product }: OrderProductCardProps) {
  const [inStock, setInStock] = useState(false)

  useEffect(() => {
    setInStock(product.quantity > 0)
  }, [])

  return (
    <div className="flex items-center gap-6 p-4 rounded-lg bg-white shadow-[0_2px_15px_-1px_rgba(113,113,113,0.12)]">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-[182px] h-[196px] object-contain flex-shrink-0"
      />

      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-2xl font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex flex-col gap-2">
          {/* Color */}
          <div className="flex items-center gap-1">
            <div
              className="w-[15px] h-[15px] rounded-full"
              style={{ backgroundColor: product.color.code }}
            />
            <span className="text-[12px] font-light text-gray-500">
              {product.color.name}
            </span>
          </div>

          {/* Free Delivery */}
          {/*{hasDelivery && (
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-medium text-gray-500">
                Free Delivery
              </span>
            </div>
          )}*/}

          {/* In Stock */}
          {inStock && (
            <div className="flex items-center gap-1">
              <Store className="w-[15px] h-[15px] text-primary" />
              <span className="text-[12px] font-light text-gray-500">
                In Stock
              </span>
            </div>
          )}

          {/* Out Stock */}
          {!inStock && (
            <div className="flex items-center gap-1">
              <Store className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-medium text-red-500">
                Out Stock
              </span>
            </div>
          )}

          {/* Guarantee */}
          {/*{hasGuarantee && (
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-medium text-gray-500">
                Guaranteed
              </span>
            </div>
          )}*/}
        </div>

        {/* Price and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount && (
              <span className="text-xs font-normal text-gray-500 line-through">
                {product.price}
              </span>
            )}
            <span className="text-base font-normal text-gray-900">
              {product.final_price}
            </span>
          </div>

          <div className="flex items-end gap-2">
            <button
              className="w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>

            <div className="flex items-center gap-3 border-b border-gray-400 pb-1">
              <button
                className={`hover:opacity-70 transition-opacity ${inStock ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-gray-500" />
              </button>
              <span
                className={`text-sm font-light text-gray-500 min-w-[16px] text-center ${inStock ? '' : 'text-red-500'}`}
              >
                {product.quantity}
              </span>
              <button
                className={`hover:opacity-70 transition-opacity ${inStock ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
