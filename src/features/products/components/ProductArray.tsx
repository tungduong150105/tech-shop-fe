import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductArrayProps {
  productList: Product[]
  title: string
}

export function ProductArray({
  title = 'Products On Sale',
  productList,
}: ProductArrayProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.8
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.offsetWidth,
            scrollPosition + scrollAmount
          )

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    setScrollPosition(newPosition)
  }

  const showNavigation = productList.length > 4

  return (
    <section className="w-full">
      <div className="mx-auto relative z-10">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-xl font-normal text-black mb-2 text-nowrap">
              {title}
            </h2>
          </div>
          <button className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors group">
            <span className="text-base">View all</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="flex flex-row mb-8">
          <div className="">
            {/* Navigation Buttons */}
            {showNavigation && (
              <>
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={scrollPosition === 0}
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-900" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-6 h-6 text-blue-900" />
                </button>
              </>
            )}

            {/* Products Scroll Container */}
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {productList.map((product, index) => (
                <div
                  key={product.id || index}
                  className=""
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
