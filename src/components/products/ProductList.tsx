import { useState } from 'react'

interface ProductItem {
  id: string
  name: string
  image: string
  price: number
  rating: number
  colors: string[]
}

interface ProductListProps {
  products: ProductItem[]
}

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-blue-600"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

const ProductList = ({ products }: ProductListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const next = () => {
    if (currentIndex < products.length - 4) setCurrentIndex(currentIndex + 1)
  }

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  function onClickProduct(id: string) {
    console.log('Product clicked:', id)
  }

  return (
    <div className="w-full mx-auto p-5">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
        Similar Products
      </h2>

      <div className="relative flex items-center">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className={`absolute left-0 z-10 p-2 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ‹
        </button>

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 gap-5"
            style={{ transform: `translateX(-${currentIndex * 260}px)` }}
          >
            {products.map(p => (
              <div
                key={p.id}
                className="min-w-[250px] bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-3"
                onClick={() => onClickProduct(p.id)}
              >
                <div className="inline-flex">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-contain mb-3"
                  />

                  {/* Product colors */}
                  {p.colors.length > 0 && (
                    <div className="flex flex-col items-center gap-2 mb-3 justify-center">
                      {p.colors.slice(0, 3).map((color, i) => (
                        <span
                          key={i}
                          className="h-4 w-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {p.colors.length > 3 && (
                        <span className="text-gray-500 text-sm">+</span>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-1 line-clamp-2 h-10">
                  {p.name}
                </p>
                <p className="text-gray-900 font-semibold mb-1">
                  ${p.price.toFixed(2)}
                </p>

                <div className="flex items-center justify-end text-sm font-medium text-gray-600">
                  <StarIcon />
                  <span className="ml-1">{p.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          disabled={currentIndex >= products.length - 4}
          className={`absolute right-0 z-10 p-2 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ›
        </button>
      </div>
    </div>
  )
}
export default ProductList
