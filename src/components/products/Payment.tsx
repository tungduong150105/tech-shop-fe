import { useState } from 'react'
import { toast } from 'sonner'

interface ProductProps {
  discount: number
  price: number
  color: string
  id: number
  quantity: number
}

const Payment = ({ discount, price, color, id, quantity }: ProductProps) => {
  const [paymentType, setPaymentType] = useState('now')
  const installmentOptions = [3, 6, 12, 24]
  const [selectedMonths, setSelectedMonths] = useState<number>(3)
  function AddToCart() {
    console.log(paymentType, selectedMonths, id, color)
    console.log('Add to cart clicked')
    if (quantity > 0) {
      toast.success('Add to Cart completed successfully!')
    }
  }
  function BuyNow() {
    console.log(paymentType, selectedMonths, id, color)
    console.log('BuyNow clicked')
  }
  return (
    <div>
      <div className="shadow p-7 rounded-lg flex text-nowrap flex-col max-w-[400px] min-w-[400px]">
        <div className="inline-flex justify-between items-center mb-3">
          <h2 className="text-2xl">$ {Number(((price * (100 - discount)) / 100).toFixed(2))}</h2>
          {discount > 0 && <div className="text-orange-600">-{discount}%</div>}
        </div>
        <div className="mb-5">
          {discount > 0 && (
            <p className="text-gray-700">last price: $ {Number(price).toFixed(2)}</p>
          )}
        </div>
        <div className="space-y-3">
          <div className="">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paynow"
                value="paynow"
                checked={paymentType === 'now'}
                onChange={() => setPaymentType('now')}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-800 font-normal text-xl">Pay Now</span>
            </label>
          </div>
          <div className="">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paynow"
                value="paynow"
                checked={paymentType === 'installment'}
                onChange={() => setPaymentType('installment')}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-800 font-normal text-xl">
                Buy in installments
              </span>
            </label>
            <p className="pl-7 text-gray-700">
              choose your installments period
            </p>
          </div>
          <div className="">
            {paymentType === 'installment' && (
              <div className="space-y-2 ml-6 flex flex-col">
                <p className="text-sm text-gray-500">
                  choose your installments period
                </p>
                <div className="flex gap-3">
                  {installmentOptions.map(months => (
                    <button
                      key={months}
                      onClick={() => setSelectedMonths(months)}
                      className={`px-2 py-2 rounded-md border text-sm font-medium ${
                        selectedMonths === months
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {months}
                      <p className="font-light">Months</p>
                    </button>
                  ))}
                </div>
                <p className="text-lg font-normal text-gray-800 mt-2">
                  ${(price / selectedMonths).toFixed(2)} / Month
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              className={`w-full bg-blue-600 text-white py-3 rounded-lg  transition-colors ${
                quantity > 0
                  ? 'hover:bg-blue-700'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => BuyNow()}
            >
              Buy Now
            </button>
          </div>
          <div>
            <button
              className={`w-full bg-white text-blue-600 py-3 rounded-lg  transition-colors ring ring-blue-600 ${
                quantity > 0
                  ? 'hover:text-blue-700'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => AddToCart()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Payment
