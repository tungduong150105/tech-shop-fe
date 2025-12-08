import RemoveCart from '../../assets/remove-cart.svg'

import type { CartItem } from '../../types/cart'

interface CartProps {
  cartProducts: CartItem[]
}

const CartContent = ({cartProducts} : CartProps) => {
  if (!cartProducts || cartProducts.length === 0) {
    return <div className="text-sm text-gray-500">No items in cart</div>
  }

  return (
    <div>
      {cartProducts.map((product, index) => {
        const imageUrl = product.image_url || ''
        const name = product.name || 'Unknown Product'
        const colorName = product.color?.name || ''
        const quantity = product.sold_quantity || product.quantity || 0
        const finalPrice = product.final_price || product.unit_final_price || product.price || 0

        return (
          <div
            key={product.id || index}
            className="flex items-center space-x-4 rounded-lg shadow mb-2 px-2"
          >
            <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="h-full w-full object-contain" />
              ) : (
                <div className="text-xs text-gray-400">No image</div>
              )}
            </div>
            <div className="p-3 flex-1 min-w-0">
              <h3 className="text-md font-medium truncate">{name}</h3>
              {colorName && (
                <p className="text-sm text-gray-600">{colorName}</p>
              )}
              <p className="text-sm text-gray-600 mb-2">x {quantity}</p>
              <div className="flex flex-row justify-between">
                <p className="text-sm font-light">${finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartContent
