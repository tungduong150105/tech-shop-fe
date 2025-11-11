// @ts-ignore
import StarIcon from '../../assets/star-icon.svg'
// @ts-ignore
import StockIcon from '../../assets/stock-icon.svg'
// @ts-ignore
import GuaranteeIcon from '../../assets/guarantee-icon.svg'
// @ts-ignore
import DeliveryIcon from '../../assets/delivery-icon.svg'

import { useEffect, useState } from 'react'
import Payment from './Payment'
import TechnicalDetail from './TechnicalDetail'
import SimilarProduct from './ProductList'

import type { ProductRes, Product } from '../../types/product'
import { useSimilarProducts, useProductReviews } from '../../hooks/useProducts'
import ListProduct from './ListProduct'
import Review from './Review'

const comments: Comment[] = [
  {
    id: '1',
    user: 'Gabriel',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: 'July 28, 2023',
    rating: 4.8,
    content:
      'I needed a fast, efficient laptop for on the go use. Battery life is amazing. Build quality is fantastic. Perfect fit for my needs.',
    likes: 15,
    dislikes: 0,
    replies: 2
  },
  {
    id: '2',
    user: 'Jimmy Smith',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    date: 'May 28, 2023',
    rating: 5.0,
    content:
      "This macbook air at first feels just so big to me using it for school, and after a while, it felt as a perfect size. I look at it sometimes and realize how portable and small it is, but IT FEELS AS BIG AS LIKE A TV SCREEN. It's not a huge computer, but when your doing work and typing or whatever watching youtube it feels like a movie screen, beautiful. I never had such a good computer that just feels like a breath of fresh air. If you are contemplating on buying one, I would get 512 GB of storage and 16 ram. You will not be disappointed if you buy this no matter what, I strongly recommend it.",
    likes: 8,
    dislikes: 0,
    replies: 0
  },
  {
    id: '3',
    user: 'Sarah Anderson',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    date: 'April 20, 2023',
    rating: 4.2,
    content:
      'This was my first personal Mac purchase. We are using a combination of Mac & PC at work and while my PC skills are good the Mac side needs work. So far I like the experience, although not all my apps will run on the Mac, I am finding workarounds. One person found this helpful.',
    likes: 34,
    dislikes: 0,
    replies: 5
  }
]

interface ProductDetailProps {
  product: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  window.scrollTo(0, 0)
  const [selectedInfo, setSelectedInfo] = useState('technical')
  const [mainImage, setMainImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
  )
  const [selectedColor, setSelectedColor] = useState('Gray')
  const [expanded, setExpanded] = useState(false)
  const visibleCount = expanded ? product.specs.length : 5

  const { data: similarProducts } = useSimilarProducts(Number(product.category_id))
  const { data: reviewOfProduct, isLoading: reviewLoading } = useProductReviews(Number(product.id))
  console.log('Review of product:', reviewOfProduct)

  useEffect(() => {
    if (product?.img?.length > 0) {
      setMainImage(product.img[0])
    }
    if (product?.color?.length > 0) {
      setSelectedColor(product.color[0].name)
    }
  }, [product])

  return (
    <div className="p-6">
      <div className="px-10 mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col xl:flex-row justify-center space-x-10 xl:items-start items-center">
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex space-x-4 mb-4 overflow-auto">
              {product.img.map((image, index) => (
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  key={index}
                  className={`w-20 h-20 object-contain rounded-lg cursor-pointer p-1 ${
                    mainImage === image ? 'border-2 border-blue-600' : 'border'
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="md:ml-5 min-w-[30%] mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {product.name}
            </h1>
            <div className="flex flex-row items-center gap-5 mb-8">
              <p className="bg-blue-950 px-2 py-1 rounded-lg text-white">
                <img
                  src={StarIcon}
                  alt="star-icon"
                  className="w-4 h-4 inline mb-1"
                />{' '}
                {product.rating}
              </p>
              <p className="text-xl text-gray-700">Sold {product.sold}</p>
            </div>
            <div className="inline-flex items-center mb-2 space-x-4">
              <h2 className="font-light text-xl">Select Color</h2>
              {product.color.map(c => (
                <button
                  key={c.name}
                  className={`w-8 h-8 rounded-full mr-4 cursor-pointer ${
                    c.name === selectedColor ? 'border-2 border-blue-600' : ''
                  }`}
                  style={{ backgroundColor: c.code }}
                  onClick={() => setSelectedColor(c.name)}
                />
              ))}
            </div>
            <div className="space-y-5 text-nowrap">
              <div className="inline-flex items-end">
                <img
                  src={StockIcon}
                  alt="guarantee-icon"
                  className="w-7 h-7 inline mt-4 mr-2"
                />
                {product.quantity > 0 ? (
                  <p className="text-green-600 font-medium mt-2">In Stock</p>
                ) : (
                  <p className="text-red-600 font-medium mt-2">Out of Stock</p>
                )}
              </div>
              <div className="inline-flex items-end ml-6">
                <img
                  src={GuaranteeIcon}
                  alt="guarantee-icon"
                  className="w-7 h-7 inline mt-4 mr-2"
                />
                <p className="text-gray-700 font-medium mt-2">Guarantee</p>
              </div>
              <div className="inline-flex items-end ml-6">
                <img
                  src={DeliveryIcon}
                  alt="guarantee-icon"
                  className="w-7 h-7 inline mt-4 mr-2"
                />
                <p className="text-gray-700 font-medium mt-2">Fast Delivery</p>
              </div>
            </div>
            <div className="mt-10 ml-10">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3">
                {product.specs.slice(0, visibleCount).map(s => (
                  <div key={s.label} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400"
                      aria-hidden
                    />
                    <div className="flex-1 grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr]">
                      <dt className="text-gray-500">{s.label}</dt>
                      <dd className="text-gray-900 font-medium">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              {product.specs.length > 5 && (
                <button
                  className="mt-4 text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <>
                      Show Less <span> &lt; </span>
                    </>
                  ) : (
                    <>
                      Show More <span> &gt; </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <Payment
            discount={product.discount}
            price={product.price}
            color={selectedColor}
            id={product.id}
            quantity={product.quantity}
          />
        </div>
        <div>
          <nav className="mt-10 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedInfo('technical')}
                className={`pb-4 text-lg font-medium ${
                  selectedInfo === 'technical'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Technical Details
              </button>
              <button
                onClick={() => setSelectedInfo('similar')}
                className={`pb-4 text-lg font-medium ${
                  selectedInfo === 'similar'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Similar Products
              </button>
              <button
                onClick={() => setSelectedInfo('comment')}
                className={`pb-4 text-lg font-medium ${
                  selectedInfo === 'comment'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Comments
              </button>
            </div>
          </nav>
          {selectedInfo === 'technical' && (
            <TechnicalDetail specs={product.specs_detail} />
          )}
          {selectedInfo === 'similar' && (
            <ListProduct
              title="Similar Product"
              products={similarProducts || null}
            />
          )}
          {selectedInfo === 'comment' &&
            (!reviewLoading && <Review review={reviewOfProduct?.reviews || null} />)
          }
        </div>
        <div
          className={`${selectedInfo !== 'similar' ? 'block' : 'hidden'} mt-10 px-5`}
        >
          <ListProduct
            title="Similar Product"
            products={similarProducts || null}
          />
        </div>
        <div
          className={`${selectedInfo !== 'comment' ? 'block' : 'hidden'} mt-10`}
        >
          {!reviewLoading && <Review review={reviewOfProduct?.reviews || null} />}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
