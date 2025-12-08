import { useParams } from 'react-router-dom'
import { useProductById, useSimilarProducts } from '../hooks/useProducts'
import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import { Footer, Header } from '@/shared/components/layout'
import { Payment } from '@/features/payment/components/Payment'
import TechnicalDetail from '../components/TechnicalDetail'
import { ProductArray } from '../components/ProductArray'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const { data: product, isLoading, error } = useProductById(productId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !product) {
    return <div>Error loading product details.</div>
  }

  return <RenderProductDetail product={product} />
}

function RenderProductDetail({ product }: { product: Product }) {
  const [selectedInfo, setSelectedInfo] = useState('technical')
  const [mainImage, setMainImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
  )
  const [selectedColor, setSelectedColor] = useState('No Color')
  const [expanded, setExpanded] = useState(false)
  const visibleCount = expanded ? product.specs.length : 5

  useEffect(() => {
    setMainImage(product.img[0])
    setSelectedColor(product.color[0].name)
  }, [])

  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const { data: similarData, isLoading: isSimilarLoading } = useSimilarProducts(
    Number(product.category_id),
    1,
    15
  )

  useEffect(() => {
    setSimilarProducts(similarData?.products || [])
  }, [similarData])

  // const { data: reviewOfProduct, isLoading: reviewLoading } = useProductReviews(Number(product.id))
  // console.log('Review of product:', reviewOfProduct)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white mt-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px] pb-12">
          <div className="flex flex-col xl:flex-row gap-12">
            {/* Image and Details */}
            <div className="space-y-6 w-[496px]">
              <div className="w-full relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mainImage}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-6 justify-center overflow-x-auto">
                {product.img.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`w-[71px] h-[71px] rounded border overflow-hidden transition-all ${
                      mainImage === img
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-neutral-gray-ED'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-[70px] h-[70px] object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:ml-5 w-[365px] mb-4">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {product.name}
              </h1>
              <div className="flex flex-row items-center gap-5 mb-4">
                <div className="flex items-center bg-blue-950 px-2 py-1 rounded-lg text-white">
                  <div className="w-4 h-4 inline-block mr-1">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.52447 0.963526C7.67415 0.502871 8.32585 0.50287 8.47553 0.963525L9.90837 5.37336C9.97531 5.57937 10.1673 5.71885 10.3839 5.71885H15.0207C15.505 5.71885 15.7064 6.33865 15.3146 6.62336L11.5633 9.34878C11.3881 9.4761 11.3148 9.70179 11.3817 9.9078L12.8145 14.3176C12.9642 14.7783 12.437 15.1613 12.0451 14.8766L8.29389 12.1512C8.11865 12.0239 7.88135 12.0239 7.70611 12.1512L3.95488 14.8766C3.56303 15.1613 3.03578 14.7783 3.18546 14.3176L4.6183 9.9078C4.68524 9.70179 4.61191 9.4761 4.43667 9.34878L0.685441 6.62336C0.293584 6.33866 0.494972 5.71885 0.979333 5.71885H5.6161C5.83272 5.71885 6.02469 5.57937 6.09163 5.37336L7.52447 0.963526Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {product.rating}
                </div>
                <p className="font-light text-l text-gray-700">
                  Sold {product.sold}
                </p>
              </div>
              <div className="text-nowrap flex items-center justify-between mb-4">
                <div className="inline-flex items-end items-center gap-3">
                  <div className="w-4 h-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2505 18.9584H7.75046C3.63379 18.9584 1.88379 17.2001 1.88379 13.0918V9.3501C1.88379 9.00843 2.16712 8.7251 2.50879 8.7251C2.85046 8.7251 3.13379 9.00843 3.13379 9.3501V13.0918C3.13379 16.5001 4.34212 17.7084 7.75046 17.7084H12.2421C15.6505 17.7084 16.8588 16.5001 16.8588 13.0918V9.3501C16.8588 9.00843 17.1421 8.7251 17.4838 8.7251C17.8255 8.7251 18.1088 9.00843 18.1088 9.3501V13.0918C18.1171 17.2001 16.3588 18.9584 12.2505 18.9584Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M10.0002 10.6251C9.0835 10.6251 8.25016 10.2667 7.6585 9.60841C7.06683 8.95008 6.79183 8.09175 6.8835 7.17508L7.44183 1.60841C7.47516 1.29175 7.74183 1.04175 8.06683 1.04175H11.9585C12.2835 1.04175 12.5502 1.28341 12.5835 1.60841L13.1418 7.17508C13.2335 8.09175 12.9585 8.95008 12.3668 9.60841C11.7502 10.2667 10.9168 10.6251 10.0002 10.6251ZM8.62516 2.29175L8.12516 7.30008C8.06683 7.85841 8.2335 8.38341 8.5835 8.76675C9.29183 9.55008 10.7085 9.55008 11.4168 8.76675C11.7668 8.37508 11.9335 7.85008 11.8752 7.30008L11.3752 2.29175H8.62516Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M15.258 10.6251C13.5663 10.6251 12.058 9.25841 11.883 7.57508L11.2997 1.73341C11.283 1.55841 11.3413 1.38341 11.458 1.25008C11.5747 1.11675 11.7413 1.04175 11.9247 1.04175H14.4663C16.9163 1.04175 18.058 2.06675 18.3997 4.58341L18.633 6.90008C18.733 7.88341 18.433 8.81675 17.7913 9.52508C17.1497 10.2334 16.2497 10.6251 15.258 10.6251ZM12.6163 2.29175L13.133 7.45008C13.2413 8.49175 14.208 9.37508 15.258 9.37508C15.8913 9.37508 16.458 9.13342 16.8663 8.69175C17.2663 8.25008 17.4497 7.65841 17.3913 7.02508L17.158 4.73341C16.8997 2.85008 16.2913 2.29175 14.4663 2.29175H12.6163Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M4.69953 10.6251C3.70786 10.6251 2.80786 10.2334 2.1662 9.52508C1.52453 8.81675 1.22453 7.88341 1.32453 6.90008L1.54953 4.60841C1.89953 2.06675 3.0412 1.04175 5.4912 1.04175H8.03286C8.20786 1.04175 8.37453 1.11675 8.49953 1.25008C8.62453 1.38341 8.67453 1.55841 8.65786 1.73341L8.07453 7.57508C7.89953 9.25841 6.3912 10.6251 4.69953 10.6251ZM5.4912 2.29175C3.6662 2.29175 3.05786 2.84175 2.7912 4.75008L2.5662 7.02508C2.49953 7.65841 2.6912 8.25008 3.0912 8.69175C3.4912 9.13342 4.05786 9.37508 4.69953 9.37508C5.74953 9.37508 6.72453 8.49175 6.82453 7.45008L7.3412 2.29175H5.4912Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M12.0837 18.9584H7.91699C7.57533 18.9584 7.29199 18.6751 7.29199 18.3334V16.2501C7.29199 14.5001 8.25033 13.5417 10.0003 13.5417C11.7503 13.5417 12.7087 14.5001 12.7087 16.2501V18.3334C12.7087 18.6751 12.4253 18.9584 12.0837 18.9584ZM8.54199 17.7084H11.4587V16.2501C11.4587 15.2001 11.0503 14.7917 10.0003 14.7917C8.95033 14.7917 8.54199 15.2001 8.54199 16.2501V17.7084Z"
                        fill="#0C68F4"
                      />
                    </svg>
                  </div>
                  {product.quantity > 0 ? (
                    <p className="text-green-600 font-medium mt-2">In Stock</p>
                  ) : (
                    <p className="text-red-600 font-medium mt-2">
                      Out of Stock
                    </p>
                  )}
                </div>
                <div className="inline-flex items-end items-center gap-3">
                  <div className="w-4 h-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99212 12.6416C8.82546 12.6416 8.66712 12.5749 8.55046 12.4582L6.53379 10.4416C6.29212 10.1999 6.29212 9.7999 6.53379 9.55824C6.77546 9.31657 7.17546 9.31657 7.41712 9.55824L8.99212 11.1332L12.5755 7.5499C12.8171 7.30824 13.2171 7.30824 13.4588 7.5499C13.7005 7.79157 13.7005 8.19157 13.4588 8.43324L9.43379 12.4582C9.31712 12.5749 9.15879 12.6416 8.99212 12.6416Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M10.0001 18.9584C9.47507 18.9584 8.95006 18.7834 8.54173 18.4334L7.22506 17.3001C7.09173 17.1834 6.7584 17.0667 6.5834 17.0667H5.15006C3.91673 17.0667 2.91673 16.0667 2.91673 14.8334V13.4084C2.91673 13.2334 2.80007 12.9084 2.6834 12.7751L1.5584 11.4501C0.875065 10.6417 0.875065 9.36675 1.5584 8.55842L2.6834 7.23342C2.80007 7.10008 2.91673 6.77508 2.91673 6.60008V5.16675C2.91673 3.93341 3.91673 2.93341 5.15006 2.93341H6.59173C6.76673 2.93341 7.10007 2.80841 7.2334 2.70008L8.55007 1.56675C9.36673 0.866748 10.6417 0.866748 11.4584 1.56675L12.7751 2.70008C12.9084 2.81675 13.2417 2.93341 13.4167 2.93341H14.8334C16.0667 2.93341 17.0667 3.93341 17.0667 5.16675V6.58342C17.0667 6.75842 17.1917 7.09175 17.3084 7.22508L18.4417 8.54175C19.1417 9.35841 19.1417 10.6334 18.4417 11.4501L17.3084 12.7667C17.1917 12.9001 17.0667 13.2334 17.0667 13.4084V14.8251C17.0667 16.0584 16.0667 17.0584 14.8334 17.0584H13.4167C13.2417 17.0584 12.9084 17.1834 12.7751 17.2917L11.4584 18.4251C11.0501 18.7834 10.5251 18.9584 10.0001 18.9584ZM5.15006 4.18341C4.6084 4.18341 4.16673 4.62508 4.16673 5.16675V6.59175C4.16673 7.06675 3.94173 7.67508 3.6334 8.03342L2.5084 9.35841C2.21673 9.70008 2.21673 10.2917 2.5084 10.6334L3.6334 11.9584C3.94173 12.3251 4.16673 12.9251 4.16673 13.4001V14.8251C4.16673 15.3667 4.6084 15.8084 5.15006 15.8084H6.59173C7.07506 15.8084 7.6834 16.0334 8.05006 16.3501L9.36673 17.4834C9.7084 17.7751 10.3084 17.7751 10.6501 17.4834L11.9667 16.3501C12.3334 16.0417 12.9417 15.8084 13.4251 15.8084H14.8417C15.3834 15.8084 15.8251 15.3667 15.8251 14.8251V13.4084C15.8251 12.9251 16.0501 12.3167 16.3667 11.9501L17.5001 10.6334C17.7917 10.2917 17.7917 9.69175 17.5001 9.35008L16.3667 8.03342C16.0501 7.66675 15.8251 7.05841 15.8251 6.57508V5.16675C15.8251 4.62508 15.3834 4.18341 14.8417 4.18341H13.4251C12.9417 4.18341 12.3334 3.95841 11.9667 3.64175L10.6501 2.50841C10.3084 2.21675 9.7084 2.21675 9.36673 2.50841L8.05006 3.65008C7.6834 3.95842 7.06673 4.18341 6.59173 4.18341H5.15006Z"
                        fill="#0C68F4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mt-2">Guarantee</p>
                </div>
                <div className="inline-flex items-end items-center gap-3">
                  <div className="w-4 h-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8337 12.2917H1.66699C1.32533 12.2917 1.04199 12.0084 1.04199 11.6667V5.00008C1.04199 2.81675 2.81699 1.04175 5.00033 1.04175H12.5003C12.842 1.04175 13.1253 1.32508 13.1253 1.66675V10.0001C13.1253 11.2667 12.1003 12.2917 10.8337 12.2917ZM2.29199 11.0417H10.8337C11.4087 11.0417 11.8753 10.5751 11.8753 10.0001V2.29175H5.00033C3.50866 2.29175 2.29199 3.50841 2.29199 5.00008V11.0417Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M15.8337 17.2917H15.0003C14.6587 17.2917 14.3753 17.0084 14.3753 16.6667C14.3753 16.0917 13.9087 15.6251 13.3337 15.6251C12.7587 15.6251 12.292 16.0917 12.292 16.6667C12.292 17.0084 12.0087 17.2917 11.667 17.2917H8.33366C7.99199 17.2917 7.70866 17.0084 7.70866 16.6667C7.70866 16.0917 7.24199 15.6251 6.66699 15.6251C6.09199 15.6251 5.62533 16.0917 5.62533 16.6667C5.62533 17.0084 5.34199 17.2917 5.00033 17.2917H4.16699C2.44199 17.2917 1.04199 15.8917 1.04199 14.1667V11.6667C1.04199 11.3251 1.32533 11.0417 1.66699 11.0417H10.8337C11.4087 11.0417 11.8753 10.5751 11.8753 10.0001V4.16675C11.8753 3.82508 12.1587 3.54175 12.5003 3.54175H14.0337C14.8587 3.54175 15.617 3.98343 16.0253 4.70009L17.4503 7.19175C17.5587 7.38342 17.5587 7.62509 17.4503 7.81675C17.342 8.00842 17.1337 8.12508 16.9087 8.12508H15.8337C15.717 8.12508 15.6253 8.21675 15.6253 8.33341V10.8334C15.6253 10.9501 15.717 11.0417 15.8337 11.0417H18.3337C18.6753 11.0417 18.9587 11.3251 18.9587 11.6667V14.1667C18.9587 15.8917 17.5587 17.2917 15.8337 17.2917ZM15.542 16.0417H15.8337C16.867 16.0417 17.7087 15.2001 17.7087 14.1667V12.2917H15.8337C15.0337 12.2917 14.3753 11.6334 14.3753 10.8334V8.33341C14.3753 7.53341 15.0253 6.87508 15.8337 6.87508L14.942 5.31675C14.7587 4.99175 14.4087 4.79175 14.0337 4.79175H13.1253V10.0001C13.1253 11.2667 12.1003 12.2917 10.8337 12.2917H2.29199V14.1667C2.29199 15.2001 3.13366 16.0417 4.16699 16.0417H4.45866C4.73366 15.0834 5.61699 14.3751 6.66699 14.3751C7.71699 14.3751 8.60032 15.0834 8.87532 16.0417H11.1336C11.4086 15.0834 12.292 14.3751 13.342 14.3751C14.392 14.3751 15.267 15.0834 15.542 16.0417Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M6.66667 18.9583C5.4 18.9583 4.375 17.9333 4.375 16.6667C4.375 15.4 5.4 14.375 6.66667 14.375C7.93333 14.375 8.95833 15.4 8.95833 16.6667C8.95833 17.9333 7.93333 18.9583 6.66667 18.9583ZM6.66667 15.625C6.09167 15.625 5.625 16.0917 5.625 16.6667C5.625 17.2417 6.09167 17.7083 6.66667 17.7083C7.24167 17.7083 7.70833 17.2417 7.70833 16.6667C7.70833 16.0917 7.24167 15.625 6.66667 15.625Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M13.3337 18.9583C12.067 18.9583 11.042 17.9333 11.042 16.6667C11.042 15.4 12.067 14.375 13.3337 14.375C14.6003 14.375 15.6253 15.4 15.6253 16.6667C15.6253 17.9333 14.6003 18.9583 13.3337 18.9583ZM13.3337 15.625C12.7587 15.625 12.292 16.0917 12.292 16.6667C12.292 17.2417 12.7587 17.7083 13.3337 17.7083C13.9087 17.7083 14.3753 17.2417 14.3753 16.6667C14.3753 16.0917 13.9087 15.625 13.3337 15.625Z"
                        fill="#0C68F4"
                      />
                      <path
                        d="M18.3333 12.2917H15.8333C15.0333 12.2917 14.375 11.6333 14.375 10.8333V8.33333C14.375 7.53333 15.0333 6.875 15.8333 6.875H16.9083C17.1333 6.875 17.3417 6.99167 17.45 7.19167L18.875 9.69167C18.925 9.78334 18.9583 9.89167 18.9583 10V11.6667C18.9583 12.0083 18.675 12.2917 18.3333 12.2917ZM15.8333 8.125C15.7167 8.125 15.625 8.21667 15.625 8.33333V10.8333C15.625 10.95 15.7167 11.0417 15.8333 11.0417H17.7083V10.1667L16.5417 8.125H15.8333Z"
                        fill="#0C68F4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mt-2">
                    Fast Delivery
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center mb-2 space-x-4">
                <h2 className="font-light text-l">Select Color</h2>
                {product.color.map(c => (
                  <button
                    key={c.name}
                    className={`w-7 h-7 rounded-full mr-4 cursor-pointer ${
                      c.name === selectedColor ? 'border-2 border-blue-600' : ''
                    }`}
                    style={{ backgroundColor: c.code }}
                    onClick={() => setSelectedColor(c.name)}
                  />
                ))}
              </div>

              <div className="mt-8">
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
            <div className="w-[410]">
              <Payment
                discount={product.discount}
                price={product.price}
                color={selectedColor}
                id={product.id}
                quantity={product.quantity}
              />
            </div>
          </div>
          <div className="w-[808px]">
            <nav className="mt-10 border-b border-gray-200">
              <div className="flex space-x-8">
                <button
                  onClick={() => setSelectedInfo('technical')}
                  className={`pb-4 text-lg font-light ${
                    selectedInfo === 'technical'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Technical Details
                </button>
                <button
                  onClick={() => setSelectedInfo('similar')}
                  className={`pb-4 text-lg font-light ${
                    selectedInfo === 'similar'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Similar Products
                </button>
                <button
                  onClick={() => setSelectedInfo('comment')}
                  className={`pb-4 text-lg font-light ${
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
            {selectedInfo === 'similar' &&
              (isSimilarLoading ? (
                <div className="flex justify-center items-center h-32">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="w-[1224px] mt-5 px-4">
                  <ProductArray
                    title="Similar Products"
                    productList={similarProducts}
                  />
                </div>
              ))}
            {/* {selectedInfo === 'comment' && !reviewLoading && ( */}
            {/*   <Review review={reviewOfProduct?.reviews || null} /> */}
            {/* )} */}
          </div>
          <div
            className={`${
              selectedInfo !== 'similar' ? 'block' : 'hidden'
            } mt-10 px-5`}
          >
            {isSimilarLoading ? (
              <div className="flex justify-center items-center h-32">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="w-[1224px] mt-5">
                <ProductArray
                  title="Similar Products"
                  productList={similarProducts}
                />
              </div>
            )}
          </div>
          {/* <div
          className={`${selectedInfo !== 'comment' ? 'block' : 'hidden'} mt-10`}
        >
          {!reviewLoading && (
            <Review review={reviewOfProduct?.reviews || null} />
          )}
        </div> */}
        </div>
      </div>
      <Footer />
    </>
  )
}
