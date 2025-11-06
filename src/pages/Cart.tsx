import CartContent from '../components/cart/CartContent'
import { useCart } from '../hooks/useCart'

import RemoveCart from '../assets/remove-cart.svg'

const Cart = () => {
  const { data: cartProducts, isLoading } = useCart()

  const handleInc = (productId: number) => {
    console.log('Increment product with ID:', productId)
  }

  const handleDec = (productId: number) => {
    console.log('Decrement product with ID:', productId)
  }

  const handleRemove = (productId: number) => {
    console.log('Remove product with ID:', productId)
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div>
              {cartProducts?.cart.items.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 space-x-4 rounded-lg shadow mb-2 p-4 w-full"
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-40 w-40 rounded-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-xl font-medium mb-5">{product.name}</h3>
                    <div className="inline-flex justify-between gap-2 mb-2 items-center mb-4">
                      <p className="text-sm text-gray-600">
                        {product.color.name}
                      </p>
                    </div>
                    <p className="text-l text-gray-600 mb-4">
                      x{product.quantity}
                    </p>
                    <div className="flex flex-row justify-between w-full">
                      <p className="text-xl font-light">
                        ${product.final_price}
                      </p>
                      <div className="flex flex-row items-center gap-4">
                        <img
                          onClick={() => handleRemove(product.product_id)}
                          src={RemoveCart}
                          alt="remove-cart"
                          className="h-5 w-5"
                        />
                        <div className="flex flex-row gap-4 items-center border-b border-b-gray-300">
                          <button
                            onClick={() => handleDec(product.product_id)}
                            className="text-xl font-semi"
                          >
                            -
                          </button>
                          <p> {product.quantity} </p>
                          <button
                            onClick={() => handleInc(product.product_id)}
                            className="text-xl font-semi"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-1">GG</div>
      </div>
    </div>
  )
}

export default Cart
