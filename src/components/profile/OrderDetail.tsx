interface Order {
  id: string
  placedOn: string
  total: number
  delivered?: string
  sentTo: string
  address?: string
  products: Product[]
  status?: 'processing' | 'on-the-way' | 'delivered'
  paymentType?: string
  transactionId?: string
  amountPaid?: number
}

interface Product {
  name: string
  image?: string
  color?: string
  quantity?: number
  price?: number
  originalPrice?: number
}

interface OrderDetail {
  order: Order
}

const OrderDetails = ({ order }: OrderDetail) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col mb-10">
        <dl className="divide-y divide-gray-100 rounded-md">
          <div className="flex justify-between py-3 px-3 bg-gray-100 rounded-md">
            <dt className="text-black font-normal w-1/2">order code</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              {order.id}
            </dd>
          </div>
          <div className="flex justify-between py-3 px-3">
            <dt className="text-black font-normal w-1/2">Placed on</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              {order.placedOn}
            </dd>
          </div>
          <div className="flex justify-between py-3 px-3 bg-gray-100 rounded-md">
            <dt className="text-black font-normal w-1/2">Sent to</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              {order.address}
            </dd>
          </div>
          <div className="flex justify-between py-3 px-3">
            <dt className="text-black font-normal w-1/2">Payment type</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              {order.paymentType}
            </dd>
          </div>
          <div className="flex justify-between py-3 px-3 bg-gray-100 rounded-md">
            <dt className="text-black font-normal w-1/2">Transaction id</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              {order.transactionId}
            </dd>
          </div>
          <div className="flex justify-between py-3 px-3">
            <dt className="text-black font-normal w-1/2">Amount Paid</dt>
            <dd className="text-gray-700 w-1/2 font-light text-left">
              ${order.amountPaid?.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="space-y-4">
        {order.products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 pb-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                {product.image}
              </div>
              <div>
                <p className="font-normal">{product.name}</p>
                {product.color && (
                  <p className="text-sm text-gray-500">{product.color}</p>
                )}
                {product.quantity && (
                  <p className="text-sm text-gray-500">×{product.quantity}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              {product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
              {product.price && (
                <p className="font-semibold">${product.price.toFixed(2)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderDetails
