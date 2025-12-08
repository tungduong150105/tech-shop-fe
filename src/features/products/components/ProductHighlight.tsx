import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductHighlightProps {
  productList: Product[]
  title?: string
  subtitle?: string
}

export function ProductHighlight({
  productList,
  title = 'Products On Sale',
  subtitle = 'Shop Now!'
}: ProductHighlightProps) {
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
    <section className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 md:py-10 relative overflow-hidden rounded-lg">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-4 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="flex flex-col items-center justify-center gap-8 mx-10">
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <h2 className="text-3xl md:text-2xl font-bold text-white mb-2 text-nowrap">
                {title}
              </h2>
              <p className="text-blue-200 text-lg">{subtitle}</p>
            </div>
            <button className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors group">
              <span className="text-base">View all</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
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
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {productList.map((product, index) => (
                <div
                  key={product.id || index}
                  className="w-[calc(100%-1rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] flex-shrink-0"
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
